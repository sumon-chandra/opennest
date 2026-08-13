"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { PropertyCard } from "@/components/property/PropertyCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Property } from "@/types/property"
import { useQuery } from "@tanstack/react-query"
import { getProperties } from "../_actions/get-properties"
import { ApiResponse } from "@/types"

const ITEMS_PER_PAGE = 8

export default function PropertiesPage() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const { data: propertiesData, isPending: isPropertiesLoading } = useQuery<
    ApiResponse<Property[]>
  >({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await getProperties()
      return response
    },
  })

  // Simple search filtering (title or location)
  const filteredProperties = useMemo(() => {
    const props = propertiesData?.data ?? []
    const q = search.trim().toLowerCase()
    if (!q) return props
    return props.filter((p) =>
      [p.title, p.location].some((field) => field?.toLowerCase().includes(q))
    )
  }, [propertiesData?.data, search])

  const displayProperties = filteredProperties

  // Pagination
  const totalPages = Math.ceil(displayProperties.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProperties = displayProperties.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  // Reset to first page when search changes

  // helper/container variants

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="bg-secondary/30 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">Find Your Perfect Stay</h1>
          <p className="text-muted-foreground">
            Browse from {propertiesData?.data?.length || 0} premium properties
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-border px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <input
            type="text"
            placeholder="Search properties by title, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder-muted-foreground transition focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* No sidebar - only search and results */}

            {/* Properties Grid */}
            <div className="flex-1">
              {/* Sort and Info */}
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedProperties.length > 0 ? startIndex + 1 : 0}-
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    displayProperties.length
                  )}{" "}
                  of {displayProperties.length}
                </p>
              </div>

              {/* Properties Grid */}
              {paginatedProperties.length > 0 ? (
                <>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4"
                  >
                    {paginatedProperties.map((property, idx) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        index={idx}
                      />
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 border-t border-border pt-8"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="rounded-lg border border-border p-2 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Previous page"
                      >
                        <ChevronLeft size={20} />
                      </button>

                      {/* Page Numbers */}
                      <div className="flex gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <motion.button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-lg border px-3 py-2 transition-all ${
                              currentPage === page
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border hover:bg-secondary"
                            }`}
                          >
                            {page}
                          </motion.button>
                        ))}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="rounded-lg border border-border p-2 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Next page"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </motion.div>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center"
                >
                  <p className="mb-4 text-muted-foreground">
                    No properties found.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
