"use server"

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { uploadFileToCloudinary } from "@/utils/cloudinary"

export async function createProperty(
  formData: FormData,
): Promise<ApiResponse<Property>> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in.",
      data: null,
    }
  }

  try {
    // 1. Extract files from FormData
    const thumbnailFile = formData.get("thumbnail") as File | null
    const galleryFiles = formData.getAll("images") as File[]

    if (!thumbnailFile) {
      throw new Error("Thumbnail is required")
    }

    // 2. Upload Thumbnail
    const thumbnailUrl = await uploadFileToCloudinary(
      thumbnailFile,
      "opennest/properties/thumbnails",
    )

    // 3. Upload Gallery Images
    const imageUrls = await Promise.all(
      galleryFiles.map((file) =>
        uploadFileToCloudinary(file, "opennest/properties/gallery"),
      ),
    )

    // 4. Assemble Payload
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      price: Number(formData.get("price")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      area: formData.has("area") ? Number(formData.get("area")) : null,
      thumbnail: thumbnailUrl,
      images: imageUrls,
      amenities: formData.getAll("amenities") as string[],
      status: formData.get("status") as "AVAILABLE" | "RENTED" | "UNAVAILABLE",
      categoryId: formData.get("categoryId") as string,
      featured: formData.get("featured") === "true",
    }

    // 5. Send to backend
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    )

    const result = (await res.json()) as ApiResponse<Property>

    if (result.success) {
      revalidateTag("my-properties", "max")
      revalidateTag("properties", "max")
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message: error.message || "An error occurred during upload or submission.",
      data: null,
    }
  }
}
