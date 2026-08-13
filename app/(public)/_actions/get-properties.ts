"use server"

import { ApiResponse } from "@/types"
import { Property } from "@/types/property"

export async function getProperties() {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}api/v1/properties`,
    {
      cache: "no-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["properties"],
      },
    }
  )
  const properties = (await response.json()) as ApiResponse<Property[]>

  return properties
}
