"use client"

import { motion } from "framer-motion"

export function FilterSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      className="space-y-6"
    >
      {/* Search Input Skeleton */}
      <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />

      {/* Filter Groups */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-3">
          {/* Filter Header */}
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />

          {/* Filter Items */}
          <div className="space-y-2 pl-2">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="h-4 w-full animate-pulse rounded bg-muted"
              />
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  )
}
