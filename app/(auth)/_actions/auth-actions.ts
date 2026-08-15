"use server"
import { apiFetch } from "@/utils/apiFetch";

import { ApiResponse } from "@/types"
import { UserLoginToken } from "@/types/user"
import jwt, { JwtPayload } from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface LoginPayload {
  email: string
  password: string
  redirectTo?: string
}

export const login = async ({ email, password, redirectTo }: LoginPayload) => {
  const res = await apiFetch(`auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const loginResponse = (await res.json()) as ApiResponse<UserLoginToken>

  if (loginResponse.success) {
    const cookieStore = await cookies()

    const data = loginResponse.data
    if (!data) return loginResponse

    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    })

    const decodedToken = jwt.decode(data.accessToken) as JwtPayload

    if (
      redirectTo &&
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo)
    }

    if (decodedToken.role === "TENANT") {
      redirect("/dashboard/tenant")
    } else if (decodedToken.role === "LANDLORD") {
      redirect("/dashboard/landlord")
    } else if (decodedToken.role === "ADMIN") {
      redirect("/dashboard/admin")
    }
  }

  return loginResponse
}
