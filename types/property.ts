import { PaymentStatus, PropertyStatus } from "."
import { PaginatedMeta } from "."

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
  revenue: number;
  _count: {
    reviews: number;
    favoriteProperties: number;
    rentalRequests: number;
  };
}

export interface PropertyCategory {
  id: string;
  name: string;
}

export interface PropertyMeta extends Partial<PaginatedMeta> {
  totalRevenue: number;
  activeProperties: number;
  totalBookingsThisMonth: number;
  recentBookings?: RecentBooking[];
}

export interface RecentBooking {
    property: {
        id: string;
        title: string;
        location: string;
        price: number;
        thumbnail: string | null;
        status: PropertyStatus;
    };
    tenant: {
        name: string;
        email: string;
        avatar: string | null;
    };
    payment: {
        status: PaymentStatus;
        amount: number;
        createdAt: string;
        paidAt: string | null;
    } | null;
}

export interface PropertyLandlord {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}