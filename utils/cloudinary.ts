import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary using env vars
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

import sharp from "sharp"

/**
 * Uploads a standard Web API File object to Cloudinary.
 * Optimizes the image before upload using sharp (resize and compress).
 */
export async function uploadFileToCloudinary(
  file: File,
  folder: string = "opennest/properties",
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const originalBuffer = Buffer.from(arrayBuffer)

  // Optimize image to keep it under ~200KB
  const optimizedBuffer = await sharp(originalBuffer)
    .resize({
      width: 1920,
      height: 1920,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 75 })
    .toBuffer()

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload to Cloudinary failed"))
        } else {
          resolve(result.secure_url)
        }
      },
    )

    uploadStream.end(optimizedBuffer)
  })
}
