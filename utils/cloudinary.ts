import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary using env vars
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Uploads a standard Web API File object to Cloudinary.
 * Used in Next.js Server Actions receiving FormData.
 */
export async function uploadFileToCloudinary(
  file: File,
  folder: string = "opennest/properties",
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        // Apply optimization parameters for quality/format
        quality: "auto",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload to Cloudinary failed"))
        } else {
          resolve(result.secure_url)
        }
      },
    )

    uploadStream.end(buffer)
  })
}
