"use server"

import { login } from "@/app/(auth)/_actions/auth-actions"
import { ApiResponse } from "@/types"
import { User } from "@/types/user"
import { redirect } from "next/navigation"

type CreateUserPayload = {
  role?: string
  name: string
  email: string
  password: string
  phone?: string
}

export async function createUser(payload: CreateUserPayload) {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/v1/auth/register`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    return {
      success: false,
      message: "Failed to signup.",
    }
  }

  const newUser = (await res.json()) as ApiResponse<User>

  redirect("/login")

  // await login({
  //   email: payload.email,
  //   password: payload.password,
  // })

  return newUser
}
