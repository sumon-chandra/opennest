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

export interface PropertyResponse extends Property {
  category: PropertyCategory;
  landlord: PropertyLandlord;
  _count: {
    reviews: number;
  favoriteProperties: number;
  };
}
export interface PropertyCategory {
  id: string;
  name: string;
}

export interface PropertyLandlord {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}