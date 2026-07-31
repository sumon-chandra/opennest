"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, MapPin, Bed, Bath, Heart } from "lucide-react"

import { useFavorite } from "@/hooks/useFavorite"
import { Property } from "@/types/property"
import Image from "next/image"

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorite()
  const liked = isFavorite(property.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (liked) {
      removeFavorite(property.id)
    } else {
      addFavorite(property.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link href={`/properties/${property.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
            >
              <Heart
                size={20}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-foreground"
                }
              />
            </button>
            <div className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-xs font-semibold">
              {property.category}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2">
              <h3 className="mb-1 line-clamp-2 font-semibold text-foreground">
                {property.title}
              </h3>
              <div className="mb-3 flex items-center gap-1 text-muted-foreground">
                <MapPin size={16} />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4 flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed size={16} />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath size={16} />
                <span>{property.bathrooms}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4 flex items-center gap-1 text-sm">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-muted-foreground">
                ({property.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">
                ${property.price}
              </span>
              <span className="text-sm text-muted-foreground">/night</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
