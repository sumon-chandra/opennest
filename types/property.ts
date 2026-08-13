import { PropertyStatus } from "."

export interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  bedrooms: number
  thumbnail: string
  images: string[]
  bathrooms: number
  rating: number
  amenities: string[]
  reviews: string[]
  featured: boolean
  area?: number | null
  status: PropertyStatus
  landlordId: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}
