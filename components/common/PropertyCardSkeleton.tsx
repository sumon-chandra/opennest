"use client"

import { motion } from "framer-motion"

export function PropertyCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card">
        {/* Image Skeleton */}
        <div className="h-48 w-full overflow-hidden bg-muted">
          <div className="h-full w-full animate-pulse bg-linear-to-r from-muted via-muted-foreground/10 to-muted" />
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-1 flex-col p-4">
          {/* Title */}
          <div className="mb-2 space-y-2">
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />
          </div>

          {/* Location */}
          <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-muted" />

          {/* Features (Beds/Baths) */}
          <div className="mb-4 h-4 w-1/2 animate-pulse rounded bg-muted" />

          {/* Rating */}
          <div className="mb-4 h-4 w-2/5 animate-pulse rounded bg-muted" />

          {/* Price */}
          <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </motion.div>
  )
}
