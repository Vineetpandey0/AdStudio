/**
 * POST /api/generate
 * Purpose: Generate an ad image using Hugging Face Stable Diffusion, upload result to Cloudinary
 * See: API.md for full spec
 */

import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'
import { generateAdImage } from '@/lib/imageService'

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

    // Call Hugging Face Image Service
    const imageDataUri = await generateAdImage({ prompt, style, referenceImageUrl })

    // Upload to Cloudinary
    let cloudinaryResult = null

    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      cloudinaryResult = await cloudinary.uploader.upload(imageDataUri, {
        folder: 'adstudio/generated',
        tags: ['adstudio-generated'],
        timeout: 120000,
        context: {
          prompt: prompt.substring(0, 200),
          style: style,
          created_at: new Date().toISOString(),
          source: 'huggingface'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        url: cloudinaryResult?.secure_url || imageDataUri,
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
    
    if (error.message?.includes('Rate limit') || error.message?.includes('quota') || error.status === 429) {
      return NextResponse.json(
        { error: 'Generation limit reached. Please try again in a moment.' },
        { status: 429 }
      )
    }

    if (error.message?.includes('loading')) {
      return NextResponse.json(
        { error: error.message },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Image generation failed. Please try again.' },
      { status: 500 }
    )
  }
}