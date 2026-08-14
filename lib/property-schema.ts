import { z } from "zod/v4"

export const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  location: z.string().min(1, "Please select a location"),
  price: z
    .number({ error: "Price is required" })
    .positive("Price must be positive"),
  bedrooms: z.number({ error: "Bedrooms required" }).int().min(0),
  bathrooms: z.number({ error: "Bathrooms required" }).min(0),
  area: z.number().nullable().default(null),
  thumbnail: z.url("Must be a valid URL"),
  images: z.array(z.object({ url: z.string() })).default([]),
  amenities: z.array(z.string()).default([]),
  status: z.enum(["AVAILABLE", "RENTED", "UNAVAILABLE"]),
  categoryId: z.string().min(1, "Category ID is required"),
  featured: z.boolean().default(false),
})

export type PropertyFormValues = z.infer<typeof propertySchema>
