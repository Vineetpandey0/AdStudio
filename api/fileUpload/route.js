/**
 * POST /api/generate-image
 * See /API.md for full spec.
 * Uses: Gemini 1.5 Flash (image gen) + Cloudinary upload
 * Do NOT call this from client — server-side only
 */

import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const formData = await req.formData()
        const productImageFile = formData.get("productImageFile")
        const modelImageFile = formData.get("modelImageFile")
        const caption = formData.get("caption")

        console.log("Received files:", {
            productImageFile: productImageFile?.name,
            modelImageFile: modelImageFile?.name,
            caption
        })

        return NextResponse.json({ message: "Files received successfully" })
    } catch (error) {
        console.error("Error processing upload:", error)
        return NextResponse.json({ message: "Error processing upload" }, { status: 500 })
    }
}