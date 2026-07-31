"use server"
import { ApiResponse } from "./../types/index"

import { cookies } from "next/headers"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { User } from "@/types/user"

export const getAuthUser = async (): Promise<ApiResponse<User>> => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value || null

  if (!accessToken) {
    return {
      success: false,
      statusCode: 500,
      message: "User not logged in.",
      data: null,
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/v1/users/me`, {
    headers: {
      // Authorization : accessToken as unknown as string,
      // Authorization : `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`

      Cookie: `accessToken=${accessToken}`,
    },

    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, // 1day
      tags: ["my-profile"],
    },
  })

  const result = (await res.json()) as ApiResponse<User>

  return result
}

export const logout = async () => {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")

  revalidateTag("my-profile", "max")
  redirect("/login")
}
