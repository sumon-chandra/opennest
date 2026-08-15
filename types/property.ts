import { PropertyStatus } from "."

export interface Property {
  id: string
  title: string
  description: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area?: number | null
  thumbnail: string
  images: string[]
  rating?: number | null
  amenities: string[]
  isFeatured: boolean
  status: PropertyStatus
  landlordId: string
  categoryId: string
  createdAt: Date
  updatedAt: Date
}
