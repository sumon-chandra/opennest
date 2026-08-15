"use server"
import { apiFetch } from "../../../utils/apiFetch";

import { ApiResponse } from "@/types"
import { Property, PropertyResponse } from "@/types/property"

interface GetPropertiesFilters {
  location?: string[]
  featured?: boolean
  amenities?: string[]
  minPrice?: number
  maxPrice?: number
  minRating?: number
  sortBy?: string
}

export async function getProperties(filters?: GetPropertiesFilters) {
  // Build query parameters
  const params = new URLSearchParams()

  if (filters?.location && filters.location.length > 0) {
    filters.location.forEach((loc) => params.append("location", loc))
  }

  if (filters?.featured) {
    params.append("featured", "true")
  }

  if (filters?.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((amenity) => params.append("amenities", amenity))
  }

  if (filters?.minPrice !== undefined) {
    params.append("minPrice", filters.minPrice.toString())
  }

  if (filters?.maxPrice !== undefined) {
    params.append("maxPrice", filters.maxPrice.toString())
  }

  if (filters?.minRating !== undefined) {
    params.append("minRating", filters.minRating.toString())
  }

  if (filters?.sortBy) {
    params.append("sortBy", filters.sortBy)
  }

  const queryString = params.toString()
  const url = `/properties${queryString ? `?${queryString}` : ""}`

  const response = await apiFetch(url, {
    cache: "no-cache",
    next: {
      revalidate: 60 * 60 * 6,
      tags: ["properties"],
    },
  })
  const properties = (await response.json()) as ApiResponse<PropertyResponse[]>

  return properties
}
