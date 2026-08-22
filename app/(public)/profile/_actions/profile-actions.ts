"use server"

import { apiFetch } from "../../../../utils/apiFetch"
import { ApiResponse } from "@/types"
import { User } from "@/types/user"
import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import {
  uploadFileToCloudinary,
  deleteFileFromCloudinary,
} from "@/utils/cloudinary"

export async function updateProfile(
  formData: FormData,
): Promise<ApiResponse<User>> {
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
    // Handle avatar upload
    const avatarFile = formData.get("avatar") as File | null
    const currentAvatar = formData.get("currentAvatar") as string | null
    let avatarUrl: string | undefined

    if (avatarFile && avatarFile.size > 0) {
      // Delete old avatar if it exists
      if (currentAvatar) {
        await deleteFileFromCloudinary(currentAvatar)
      }

      // Upload new avatar
      avatarUrl = await uploadFileToCloudinary(
        avatarFile,
        "opennest/avatars",
      )
    }

    // Build the payload — only include fields that are provided
    const payload: Record<string, string> = {}

    const name = formData.get("name") as string | null
    if (name) payload.name = name

    const phone = formData.get("phone") as string | null
    if (phone) payload.phone = phone

    if (avatarUrl) payload.avatar = avatarUrl

    // Send to backend
    const res = await apiFetch(`/auth/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
      body: JSON.stringify(payload),
    })

    const result = (await res.json()) as ApiResponse<User>

    if (result.success) {
      revalidateTag("my-profile", "max")
    }

    return result
  } catch (error: any) {
    return {
      success: false,
      statusCode: 500,
      message:
        error.message || "An error occurred while updating your profile.",
      data: null,
    }
  }
}
