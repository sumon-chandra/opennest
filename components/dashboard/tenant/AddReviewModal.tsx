"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createReview } from "@/app/dashboard/tenant/_actions/reviews"
import { Label } from "@/components/ui/label"

interface AddReviewModalProps {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  propertyName: string
  onReviewAdded?: () => void
}

const AddReviewModal = ({
  isOpen,
  onClose,
  propertyId,
  propertyName,
  onReviewAdded,
}: AddReviewModalProps) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      toast.error("Please select a rating")
      return
    }

    if (!comment.trim()) {
      toast.error("Please provide a comment")
      return
    }

    setIsSubmitting(true)

    const payload = {
      propertyId,
      rating,
      comment,
    }

    console.log({ payload })

    try {
      const res = await createReview({
        propertyId,
        rating,
        comment,
      })

      if (res.success) {
        toast.success("Review added successfully")
        if (onReviewAdded) onReviewAdded()
        onClose()
      } else {
        toast.error(res.message || "Failed to add review")
      }
    } catch (error) {
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="pointer-events-auto flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-background shadow-lg"
            >
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-semibold">Write a Review</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div>
                  <p className="mb-4 text-sm text-muted-foreground">
                    How was your experience at{" "}
                    <span className="font-medium text-foreground">
                      {propertyName}
                    </span>
                    ?
                  </p>

                  <div className="mb-4 flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-colors focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 transition-colors ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    placeholder="Tell us about your stay, the landlord, and the property..."
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddReviewModal
