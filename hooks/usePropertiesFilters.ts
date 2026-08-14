"use client"

import { useSearchParams } from "next/navigation"

export interface PropertiesFilters {
  location: string[]
  featured: boolean
  amenities: string[]
  minPrice: number
  maxPrice: number
  minRating: number
  sortBy: string
}

export function usePropertiesFilters(): PropertiesFilters {
  const searchParams = useSearchParams()

  return {
    location: searchParams.get("location")?.split(",").filter(Boolean) || [],
    featured: searchParams.get("featured") === "true",
    amenities: searchParams.get("amenities")?.split(",").filter(Boolean) || [],
    minPrice: parseInt(searchParams.get("minPrice") || "0"),
    maxPrice: parseInt(searchParams.get("maxPrice") || "10000"),
    minRating: parseFloat(searchParams.get("minRating") || "0"),
    sortBy: searchParams.get("sortBy") || "relevance",
  }
}
