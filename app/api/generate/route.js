/**
 * POST /api/generate
 * Purpose: Generate an ad image using Gemini AI, upload result to Cloudinary
 * See: API.md for full spec
 */

import { NextResponse } from 'next/server'
import genAI from '@/lib/gemini'
import cloudinary from '@/lib/cloudinary'

const styleGuides = {
  minimalist: 'Clean white space, simple typography, single focal point, minimal color palette (2-3 colors max), no clutter',
  bold: 'High contrast, strong typography, vivid saturated colors, dramatic composition, eye-catching',
  luxury: 'Dark moody backgrounds, gold or silver accents, elegant serif typography, premium product placement, cinematic lighting',
  playful: 'Bright fun colors, rounded shapes, whimsical elements, energetic composition, friendly feel',
  corporate: 'Professional blue/grey palette, clean layout, trustworthy imagery, clear hierarchy, business-appropriate',
}

function buildAdPrompt(userPrompt, style) {
  const styleDescription = styleGuides[style] || styleGuides['minimalist']

  return `Create a professional advertising image for the following:

Product/Campaign Description: ${userPrompt}

Visual Style Requirements: ${styleDescription}

Additional Requirements:
- Make it suitable for use as a digital advertisement
- High quality, photorealistic or well-crafted illustration as appropriate
- Composition should have clear visual hierarchy
- Leave some space for text overlay if needed
- No watermarks, no text unless it's part of the design concept
- Aspect ratio: square (1:1) preferred

Generate a compelling, professional ad visual.`
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { prompt, style = 'minimalist', referenceImageUrl } = body

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured. Add GEMINI_API_KEY to .env' },
        { status: 500 }
      )
    }

    const parts = []

    // If reference image provided, fetch and include it
    if (referenceImageUrl) {
      const imageResponse = await fetch(referenceImageUrl)
      const imageBuffer = await imageResponse.arrayBuffer()
      const base64Image = Buffer.from(imageBuffer).toString('base64')
      const contentType = imageResponse.headers.get('content-type') || 'image/jpeg'

      parts.push({
        inlineData: {
          mimeType: contentType,
          data: base64Image,
        },
      })
      parts.push({
        text: `Using this reference image for brand/style context, ${buildAdPrompt(prompt, style)}`,
      })
    } else {
      parts.push({
        text: buildAdPrompt(prompt, style),
      })
    }

    const result = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ role: 'user', parts }],
      config: {
        responseModalities: ['IMAGE', 'TEXT'],
      },
    })

    const candidates = result.candidates

    if (!candidates || candidates.length === 0) {
      return NextResponse.json(
        { error: 'No candidates returned from Gemini' },
        { status: 500 }
      )
    }

    const candidate = candidates[0]

    if (candidate.finishReason === 'SAFETY') {
      return NextResponse.json(
        { error: 'The prompt was flagged by safety filters. Please revise your description.' },
        { status: 400 }
      )
    }

    // Find image in response parts
    let imageData = null
    let mimeType = 'image/png'

    for (const part of candidate.content.parts) {
      if (part.inlineData) {
        imageData = part.inlineData.data
        mimeType = part.inlineData.mimeType
        break
      }
    }

    if (!imageData) {
      return NextResponse.json(
        { error: 'No image returned from Gemini. It may have been blocked by safety filters.' },
        { status: 500 }
      )
    }

    // Upload to Cloudinary
    let cloudinaryResult = null

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      const dataUri = `data:${mimeType};base64,${imageData}`
      cloudinaryResult = await cloudinary.uploader.upload(dataUri, {
        folder: 'adstudio/generated',
        context: `prompt=${prompt.substring(0, 200)}|style=${style}|generated_at=${new Date().toISOString()}`,
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        url: cloudinaryResult?.secure_url || `data:${mimeType};base64,${imageData}`,
        publicId: cloudinaryResult?.public_id || null,
        prompt,
        style,
      },
    })
  } catch (error) {
    console.error('Generate error:', error)

    if (error.message?.includes('SAFETY')) {
      return NextResponse.json(
        { error: 'The prompt was flagged by safety filters. Please revise your description.' },
        { status: 400 }
      )
    }
    if (error.message?.includes('quota') || error.status === 429) {
      return NextResponse.json(
        { error: 'Generation limit reached. Please try again in a moment.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Image generation failed. Please try again.' },
      { status: 500 }
    )
  }
}