"use server"
import { apiFetch } from "../utils/apiFetch";

import { login } from "@/app/(auth)/_actions/auth-actions"
import { ApiResponse } from "@/types"
import { User } from "@/types/user"

type CreateUserPayload = {
  role?: string
  name: string
  email: string
  password: string
  phone?: string
}

export async function createUser(payload: CreateUserPayload) {
  const res = await apiFetch(
    `auth/register`,
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

  return {
    ...newUser,
    redirectUrl: "/login",
  }
}
