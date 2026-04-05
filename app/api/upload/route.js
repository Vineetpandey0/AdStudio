/**
 * POST /api/upload
 * Purpose: Upload a reference image to Cloudinary
 * See: API.md for full spec
 */

import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

export async function POST(request) {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        { error: 'Cloudinary not configured. Add CLOUDINARY_* vars to .env' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Convert file to base64 data URI
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type || 'image/jpeg'
    const dataUri = `data:${mimeType};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'adstudio/uploads',
      context: `uploaded_at=${new Date().toISOString()}`,
      timeout: 120000 // 2 minute timeout 
    })

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Image upload failed. Please try again.' },
      { status: 500 }
    )
  }
}
