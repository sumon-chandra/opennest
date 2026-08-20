"use client"

import { Button } from "@/components/ui/button"
import { Property } from "@/types/property"
import { motion } from "framer-motion"
import { Heart, MapPin } from "lucide-react"
import { getFavoriteProperties, removeFavoriteProperties } from "@/app/dashboard/tenant/_actions/properties"
import { useQuery } from "@tanstack/react-query"
import { ApiResponse } from "@/types"
import PropertyNotFound from "../PropertyNotFound"

export const FavoriteProperties = () => {
    const {data: favorites, isLoading} = useQuery({
        queryKey: ["favorite-properties"],
        queryFn: () => getFavoriteProperties(),
        staleTime: 5 * 1000 * 60,
        gcTime: 10 * 1000 * 60,
    })

    const handleRemoveFavorite = async (id: string) => {
        await removeFavoriteProperties(id)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Saved Properties
          </h2>
          <div className="w-full flex flex-wrap gap-4">
            {favorites?.data?.length === 0 ? (
        <PropertyNotFound title="No saved properties yet" description="Start exploring and save your favorite properties" />
      ) : (
            favorites?.data?.map((favorite, idx) => (
              <motion.div
                key={favorite.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {favorite.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                      <MapPin size={16} /> {favorite.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">
                      {favorite.price}
                    </p>
                  </div>
                </div>
              </motion.div>
            )))}
          </div>
        </motion.div>
      )
}