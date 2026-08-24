"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Star, MapPin, Bed, Bath, Heart } from "lucide-react"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  getFavoriteProperties,
  addFavoriteProperty,
  removeFavoriteProperties,
} from "@/app/dashboard/tenant/_actions/properties"
import { PropertyResponse } from "@/types/property"
import Image from "next/image"

interface PropertyCardProps {
  property: PropertyResponse
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const queryClient = useQueryClient()

  const { data: favoritesRes } = useQuery({
    queryKey: ["favorite-properties"],
    queryFn: () => getFavoriteProperties(),
    staleTime: 5 * 1000 * 60,
    gcTime: 10 * 1000 * 60,
  })

  const favoriteRecord = favoritesRes?.data?.find(
    (f: any) => f.propertyId === property.id || f.id === property.id
  )
  const liked = !!favoriteRecord

  const addFavoriteMutation = useMutation({
    mutationFn: (id: string) => addFavoriteProperty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-properties"] })
    },
  })

  const removeFavoriteMutation = useMutation({
    mutationFn: (id: string) => removeFavoriteProperties(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorite-properties"] })
    },
  })

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    if (liked && favoriteRecord) {
      removeFavoriteMutation.mutate(favoriteRecord.id)
    } else {
      addFavoriteMutation.mutate(property.id)
    }
  }

  const propertyThumbnail =
    property.thumbnail ||
    property.images?.[0] ||
    "https://placehold.co/600x400/EEE/31343C.png?text=Property+Image+Unavailable"

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
              src={propertyThumbnail}
              alt={property.title}
              width={500}
              height={500}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 rounded-full bg-accent/90 p-2 transition-colors hover:bg-accent"
            >
              <Heart
                size={20}
                className={
                  liked ? "fill-red-500 text-red-500" : "text-foreground"
                }
              />
            </button>
            <div className="absolute bottom-3 left-3 rounded bg-foreground px-2 py-1 text-xs font-semibold text-muted">
              {property.category.name}
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
            <div className="flex justify-between">
              <div className="mb-4 flex items-center gap-1 text-sm">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-muted-foreground">
                  ({property._count.reviews} Reviews)
                </span>
              </div>
              {property._count.favoriteProperties > 0 && (
                <div className="mb-4 flex items-center gap-1 text-sm">
                  <Heart size={16} className="fill-red-500 text-red-500" />
                  <span className="font-medium">
                    {property._count.favoriteProperties}
                  </span>
                  <span className="text-muted-foreground">Favorites</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-4 flex items-baseline justify-between gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  ${property.price}
                </span>
                <span className="text-sm text-muted-foreground">/night</span>
              </div>
              {property.status === "RENTED" ? (
                <div className="ml-3 rounded-full bg-destructive px-4 py-1 text-xs font-semibold text-white">
                  <span className="font-medium">Rented</span>
                </div>
              ) : property.status === "UNAVAILABLE" ? (
                <div className="ml-3 rounded-full bg-slate-600 px-4 py-1 text-xs font-semibold text-white">
                  <span className="font-medium">Not Available</span>
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
