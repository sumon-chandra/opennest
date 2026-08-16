import { z } from "zod/v4"

export const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  // Stores HTML from the rich text editor
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Please select a location"),
  // Fixed price (not per-night)
  price: z
    .number({ error: "Price is required" })
    .positive("Price must be positive"),
  bedrooms: z.number({ error: "Bedrooms required" }).int().min(0),
  bathrooms: z.number({ error: "Bathrooms required" }).min(0),
  area: z.number().nullable().default(null),
  // Cloudinary secure_url stored as string, or File when uploading
  thumbnail: z.any().refine((val) => val instanceof File || typeof val === "string" && val.length > 0, "Thumbnail image is required"),
  // Array of Cloudinary URLs or File objects
  images: z.array(z.any().refine((val) => val instanceof File || typeof val === "string", "Must be a file or URL")).default([]),
  amenities: z.array(z.string()).default([]),
  status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]),
  // Selected from real category list fetched from the DB
  categoryId: z.string().min(1, "Please select a category"),
  isFeatured: z.boolean().default(false),
})

export type PropertyFormValues = z.infer<typeof propertySchema>
