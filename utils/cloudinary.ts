import { v2 as cloudinary } from "cloudinary"
// import sharp from "sharp"

// Lazily configure Cloudinary to ensure env vars are loaded at call time
function ensureCloudinaryConfig() {
  if (!cloudinary.config().cloud_name) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }
}

/**
 * Uploads a standard Web API File object to Cloudinary.
 * Optimizes the image before upload using sharp (resize and compress).
 */
export async function uploadFileToCloudinary(
  file: File,
  folder: string = "opennest/properties",
): Promise<string> {
  ensureCloudinaryConfig()
  const arrayBuffer = await file.arrayBuffer()
  const originalBuffer = Buffer.from(arrayBuffer)

  // Optimize image to keep it under ~200KB
  // const optimizedBuffer = await sharp(originalBuffer)
  //   .resize({
  //     width: 1920,
  //     height: 1920,
  //     fit: "inside",
  //     withoutEnlargement: true,
  //   })
  //   .webp({ quality: 75 })
  //   .toBuffer()

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

    uploadStream.end(originalBuffer)
  })
}

/**
 * Extracts the public_id from a Cloudinary URL and deletes it.
 */
export async function deleteFileFromCloudinary(url: string): Promise<boolean> {
  ensureCloudinaryConfig()
  if (!url || !url.includes("cloudinary.com")) return false

  try {
    // URL example: https://res.cloudinary.com/cloud_name/image/upload/v12345/folder/file.webp
    // We need 'folder/file' (without extension and without the version/domain stuff)
    const urlParts = url.split("/")
    const uploadIndex = urlParts.findIndex((part) => part === "upload")
    
    if (uploadIndex === -1) return false

    // Get everything after "upload/v[version]/"
    // Sometimes there is no version, so we handle both cases
    const pathParts = urlParts.slice(uploadIndex + 1)
    if (pathParts[0].startsWith("v") && !isNaN(parseInt(pathParts[0].replace("v", ""), 10))) {
      pathParts.shift() // Remove version
    }

    const fullPath = pathParts.join("/")
    // Remove extension
    const publicId = fullPath.substring(0, fullPath.lastIndexOf(".")) || fullPath

    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === "ok"
  } catch (error) {
    console.error("Cloudinary deletion error:", error)
    return false
  }
}
