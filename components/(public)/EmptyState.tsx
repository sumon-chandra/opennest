"use client"

import { motion } from "framer-motion"

interface EmptyStateProps {
  message?: string
  icon?: React.ReactNode
}

export function EmptyState({
  message = "No properties found.",
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 text-center"
    >
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="mb-4 text-muted-foreground">{message}</p>
    </motion.div>
  )
}
