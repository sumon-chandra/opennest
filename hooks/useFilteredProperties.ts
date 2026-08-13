import { Property } from "@/types/property"
import { useMemo } from "react"

export interface FilterOptions {
  search: string
  minPrice: number
  maxPrice: number
  amenities: string[]
  featured: boolean
  sortBy: "price-asc" | "price-desc" | "rating" | "newest"
}

export function useFilteredProperties(
  properties: Property[],
  filters: FilterOptions
) {
  return useMemo(() => {
    let filtered = [...properties]

    // Search filter - searches in title, location, and description
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (prop) =>
          prop.title.toLowerCase().includes(searchLower) ||
          prop.location.toLowerCase().includes(searchLower) ||
          prop.description.toLowerCase().includes(searchLower)
      )
    }

    // Price range filter
    filtered = filtered.filter(
      (prop) => prop.price >= filters.minPrice && prop.price <= filters.maxPrice
    )

    // Amenities filter - must have ALL selected amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((prop) =>
        filters.amenities.every((amenity) => prop.amenities.includes(amenity))
      )
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter((prop) => prop.featured)
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        default:
          return 0
      }
    })

    return filtered
  }, [properties, filters])
}
