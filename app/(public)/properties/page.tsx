"use client"

import { useState, useMemo } from "react"
import { PropertyFilters } from "@/components/(public)/PropertyFilters"
import { PropertiesHeader } from "@/components/(public)/PropertiesHeader"
import { StickySearchBar } from "@/components/(public)/StickySearchBar"
import { PropertiesGrid } from "@/components/(public)/PropertiesGrid"
import { PropertiesInfoBar } from "@/components/(public)/PropertiesInfoBar"
import { Pagination } from "@/components/(public)/Pagination"
import { EmptyState } from "@/components/(public)/EmptyState"
import { PropertyResponse } from "@/types/property"
import { useQuery } from "@tanstack/react-query"
import { getProperties } from "../_actions/get-properties"
import { ApiResponse } from "@/types"
import { usePropertiesFilters } from "@/hooks/usePropertiesFilters"
import { usePropertiesPagination } from "@/hooks/usePropertiesPagination"

const ITEMS_PER_PAGE = 9

export default function PropertiesPage() {
  const [search, setSearch] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const filters = usePropertiesFilters()

  const { data: propertiesData, isPending: isPropertiesLoading } = useQuery<
    ApiResponse<PropertyResponse[]>
  >({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const response = await getProperties({
        location: filters.location.length > 0 ? filters.location : undefined,
        featured: filters.featured ? true : undefined,
        amenities: filters.amenities.length > 0 ? filters.amenities : undefined,
        minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
        maxPrice: filters.maxPrice < 10000 ? filters.maxPrice : undefined,
        minRating: filters.minRating > 0 ? filters.minRating : undefined,
        sortBy: filters.sortBy !== "relevance" ? filters.sortBy : undefined,
      })
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

  const {
    currentPage,
    totalPages,
    startIndex,
    paginatedItems,
    setCurrentPage,
  } = usePropertiesPagination(filteredProperties, {
    itemsPerPage: ITEMS_PER_PAGE,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <PropertiesHeader propertiesCount={propertiesData?.data?.length || 0} />

      {/* Sticky Search Bar */}
      <StickySearchBar
        search={search}
        onSearchChange={setSearch}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={setSidebarOpen}
      />

      {/* Main Content */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-6">
            {/* Sidebar - Filters */}
            <aside
              className={`fixed inset-0 top-24 z-20 w-64 overflow-y-auto border-r border-border bg-background p-4 transition-all lg:relative lg:inset-auto lg:top-auto lg:z-0 lg:block ${
                sidebarOpen ? "block" : "hidden lg:block"
              }`}
            >
              <PropertyFilters onFilterApply={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content - Properties Grid */}
            <main className="flex-1">
              {/* Info Bar */}
              <PropertiesInfoBar
                startIndex={startIndex}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredProperties.length}
                isLoading={isPropertiesLoading}
              />

              {/* Properties Grid or Skeleton */}
              {isPropertiesLoading ? (
                <PropertiesGrid
                  properties={[]}
                  isLoading={true}
                  containerVariants={containerVariants}
                />
              ) : paginatedItems.length > 0 ? (
                <>
                  <PropertiesGrid
                    properties={paginatedItems}
                    isLoading={false}
                    containerVariants={containerVariants}
                  />

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <EmptyState />
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
