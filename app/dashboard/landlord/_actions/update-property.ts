"use server"
import { apiFetch } from "../../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { uploadFileToCloudinary } from "@/utils/cloudinary"

export async function updateProperty(
  id: string,
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
    // 1. Handle Thumbnail
    const thumbnailData = formData.get("thumbnail")
    let thumbnailUrl = ""
    if (thumbnailData instanceof File) {
      thumbnailUrl = await uploadFileToCloudinary(
        thumbnailData,
        "opennest/properties/thumbnails",
      )
    } else if (typeof thumbnailData === "string") {
      thumbnailUrl = thumbnailData
    }

    // 2. Handle Gallery Images
    const galleryData = formData.getAll("images")
    const imageUrls = await Promise.all(
      galleryData.map(async (item) => {
        if (item instanceof File) {
          return await uploadFileToCloudinary(item, "opennest/properties/gallery")
        }
        return item as string
      }),
    )

    // 3. Assemble Payload
    const payload: Record<string, any> = {}
    
    // Only add fields if they exist in FormData
    if (formData.has("title")) payload.title = formData.get("title") as string
    if (formData.has("description")) payload.description = formData.get("description") as string
    if (formData.has("location")) payload.location = formData.get("location") as string
    if (formData.has("price")) payload.price = Number(formData.get("price"))
    if (formData.has("bedrooms")) payload.bedrooms = Number(formData.get("bedrooms"))
    if (formData.has("bathrooms")) payload.bathrooms = Number(formData.get("bathrooms"))
    if (formData.has("area")) payload.area = Number(formData.get("area"))
    if (formData.has("status")) payload.status = formData.get("status")
    if (formData.has("categoryId")) payload.categoryId = formData.get("categoryId") as string
    if (formData.has("featured")) payload.featured = formData.get("featured") === "true"
    
    if (thumbnailUrl) payload.thumbnail = thumbnailUrl
    if (imageUrls.length > 0) payload.images = imageUrls
    if (formData.has("amenities")) payload.amenities = formData.getAll("amenities") as string[]

    // 4. Send to backend
    const res = await apiFetch(
      `properties/${id}`,
      {
        method: "PATCH",
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
      message: error.message || "An error occurred during upload or update.",
      data: null,
    }
  }
}
