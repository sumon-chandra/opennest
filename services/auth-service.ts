"use server"
import { apiFetch } from "../utils/apiFetch";
import { ApiResponse } from "./../types/index"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { User } from "@/types/user"

export const getAuthUser = async () => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 500,
      message: "User not logged in.",
      data: undefined,
    }
  }

  const res = await apiFetch("/auth/me", {
    headers: {
      Authorization : accessToken,
      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1day
      tags: ["my-profile"],
    },
  })

  const result = (await res.json()) as ApiResponse<User>
  
  if (result && result.success === true) {
    return {
      ...result,
      data: result.data || undefined,
    }
  }

  return {
    success: false,
    statusCode: 500,
    message: "Failed to fetch user.",
    data: undefined,
  }
}

export const logout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")

  revalidateTag("my-profile", "max")
  redirect("/login")
}
