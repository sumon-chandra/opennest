"use client"

import { motion } from "framer-motion"
import { Star, MessageSquarePlus } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock Data
const myReviews = [
  {
    id: 1,
    property: "Downtown Studio Apartment",
    landlord: "Alice Johnson",
    date: "2025-08-15",
    rating: 5,
    comment: "Great place, very clean and well maintained. Alice is a wonderful landlord who responds quickly to maintenance requests.",
  },
  {
    id: 2,
    property: "Cozy Suburb Room",
    landlord: "Mark Evans",
    date: "2024-05-10",
    rating: 4,
    comment: "Good location but a bit noisy in the mornings. Overall a solid stay for the price.",
  },
]

export default function TenantReviews() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Reviews
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your reviews of properties and landlords.
          </p>
        </div>
        <Button className="gap-2">
          <MessageSquarePlus className="h-4 w-4" /> Write a Review
        </Button>
      </motion.div>

      <div className="grid gap-6">
        {myReviews.map((review) => (
          <div key={review.id} className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{review.property}</h3>
                <p className="text-sm text-muted-foreground">Landlord: {review.landlord}</p>
              </div>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>

            <p className="text-foreground/90 mt-2">{review.comment}</p>
            
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">Delete</Button>
            </div>
          </div>
        ))}

        {myReviews.length === 0 && (
          <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground">
            <Star className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>You haven't written any reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
