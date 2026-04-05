/**
 * Dedicated Image Generation Service using Hugging Face Inference API
 */

const MODELS = {
  TEXT_TO_IMAGE: 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0',
  IMAGE_TO_IMAGE: 'https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-refiner-1.0'
};

const styleGuides = {
  minimalist: 'Clean white space, simple typography, single focal point, minimal color palette (2-3 colors max), no clutter',
  bold: 'High contrast, strong typography, vivid saturated colors, dramatic composition, eye-catching',
  luxury: 'Dark moody backgrounds, gold or silver accents, elegant serif typography, premium product placement, cinematic lighting',
  playful: 'Bright fun colors, rounded shapes, whimsical elements, energetic composition, friendly feel',
  corporate: 'Professional blue/grey palette, clean layout, trustworthy imagery, clear hierarchy, business-appropriate',
};

function buildAdPrompt(userPrompt, style) {
  const styleDescription = styleGuides[style] || styleGuides['minimalist'];
  return `${userPrompt}, ${styleDescription}, professional advertising setup, high quality, 8k resolution, highly detailed, photorealistic`;
}

/**
 * Generates an image using Hugging Face Stable Diffusion
 * @param {Object} params - { prompt: string, style: string, referenceImageUrl?: string }
 * @returns {Promise<string>} Base64 data URI of the generated image
 */
export async function generateAdImage({ prompt, style = 'minimalist', referenceImageUrl }) {
  const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

  if (!HF_API_KEY) {
    throw new Error('Hugging Face API key not configured. Add HUGGINGFACE_API_KEY to .env');
  }

  const enhancedPrompt = buildAdPrompt(prompt, style);
  
  // Decide which endpoint to use based on inputs
  const endpoint = referenceImageUrl ? MODELS.IMAGE_TO_IMAGE : MODELS.TEXT_TO_IMAGE;
  
  let payload = {
    inputs: enhancedPrompt,
    parameters: {
      negative_prompt: "low quality, blurry, text, watermark, deformed, ugly, bad anatomy",
      num_inference_steps: 30,
      guidance_scale: 7.5
    }
  };

  // If using an image-to-image API, we might need a different payload strategy depending on the exact HF endpoint requirements.
  // Standard free HF img2img is limited, but we can pass `image` parameter if the backend accepts it.
  if (referenceImageUrl) {
    try {
        const imageResponse = await fetch(referenceImageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        
        // Include base64 if supported (note: standard HF inference for SDXL refiner doesn't directly take base64 image inline this way for Free tier without a specific ControlNet/Img2Img space, but we add it structurally)
        payload.image = base64Image;
    } catch (e) {
        console.error("Failed to fetch reference image:", e);
        // Continue but drop the image to avoid total failure
    }
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    if (response.status === 503 || errorBody.error?.includes('loading')) {
      throw new Error('Model is currently loading. Please wait 30 seconds and try again. (HF Free Tier Limit)');
    }
    if (response.status === 429) {
      throw new Error('Rate limit reached. Please wait and try again.');
    }
    throw new Error(`Generation failed: ${errorBody.error || response.statusText}`);
  }

  // HF returns an image blob
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString('base64');
  const mimeType = response.headers.get('content-type') || 'image/jpeg';

  return `data:${mimeType};base64,${base64}`;
}
