import { NextResponse } from 'next/server'
import cloudinary from '@/lib/cloudinary'

/**
 * GET /api/ads
 * Purpose: Fetch recent generated ads from Cloudinary
 */
export async function GET() {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        { error: 'Cloudinary not configured' },
        { status: 500 }
      )
    }

    // Search for resources with the tag 'adstudio-generated' in the specified folder
    const result = await cloudinary.api.resources_by_tag('adstudio-generated', {
      max_results: 20,
      context: true,
      metadata: true,
      direction: 'desc'
    });

    const ads = result.resources.map(resource => ({
      url: resource.secure_url,
      publicId: resource.public_id,
      context: resource.context?.custom || {},
      created_at: resource.created_at,
      width: resource.width,
      height: resource.height
    }));

    return NextResponse.json({
      success: true,
      data: ads
    });
  } catch (error) {
    console.error('Fetch ads error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent ads' },
      { status: 500 }
    );
  }
}
