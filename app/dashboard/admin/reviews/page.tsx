"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Trash2, Star, Loader2, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { getAllReviews, deleteReview } from "@/services/admin.service"
import type { AdminReview } from "@/types/admin"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
      <span className="ml-1.5 text-sm font-medium tabular-nums">{rating}/5</span>
    </div>
  )
}

export default function ReviewModeration() {
  const [deleteTarget, setDeleteTarget] = useState<AdminReview | null>(null)
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => getAllReviews(),
  })

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: (result) => {
      if (result.success) {
        toast.success("Review deleted successfully")
        queryClient.invalidateQueries({ queryKey: ["admin-reviews"] })
      } else {
        toast.error(result.message || "Failed to delete review")
      }
      setDeleteTarget(null)
    },
    onError: () => {
      toast.error("An error occurred while deleting the review")
      setDeleteTarget(null)
    },
  })

  const reviews = data?.data ?? []

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Review Moderation
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and moderate user reviews across the platform.
          </p>
        </div>
        <Badge variant="secondary" className="self-start text-sm px-3 py-1">
          <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
          {reviews.length} Reviews
        </Badge>
      </motion.div>

      {/* Review Cards */}
      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-card p-6 shadow-xs space-y-4">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-9 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No reviews to moderate</p>
          <p className="text-sm text-muted-foreground/60 mt-1">All reviews are cleared.</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              className="rounded-xl border bg-card p-6 shadow-xs transition-shadow hover:shadow-md"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-foreground">{review.user.name}</h3>
                    <span className="text-xs text-muted-foreground">{review.user.email}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    on <span className="font-medium text-foreground">{review.property.title}</span>
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                  onClick={() => setDeleteTarget(review)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>

              {/* Rating */}
              <div className="mt-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Content */}
              <div className="mt-3 bg-muted/50 p-4 rounded-lg border">
                <p className="text-sm leading-relaxed italic">&ldquo;{review.content}&rdquo;</p>
              </div>

              {/* Footer */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <Badge variant="outline" className="text-xs font-mono">
                  {review.id.slice(0, 8)}...
                </Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review by{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.user.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteTarget && (
            <div className="bg-muted/50 p-4 rounded-lg border my-2">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={deleteTarget.rating} />
              </div>
              <p className="text-sm italic">&ldquo;{deleteTarget.content}&rdquo;</p>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="gap-2"
              disabled={deleteMutation.isPending}
              onClick={() => {
                if (deleteTarget) {
                  deleteMutation.mutate(deleteTarget.id)
                }
              }}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
