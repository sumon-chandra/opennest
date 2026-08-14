"use client"

import { motion } from "framer-motion"
import { PropertyCard } from "@/components/property/PropertyCard"
import { PropertyCardSkeleton } from "@/components/common/PropertyCardSkeleton"
import { Property } from "@/types/property"

interface PropertiesGridProps {
  properties: Property[]
  isLoading: boolean
  containerVariants?: {
    hidden: { opacity: number }
    visible: {
      opacity: number
      transition: { staggerChildren: number }
    }
  }
}

export function PropertiesGrid({
  properties,
  isLoading,
  containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  },
}: PropertiesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {properties.map((property, idx) => (
        <PropertyCard key={property.id} property={property} index={idx} />
      ))}
    </motion.div>
  )
}
