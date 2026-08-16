import { PropertyCardSkeleton } from "@/components/common/PropertyCardSkeleton"
import { FilterSkeleton } from "@/components/common/FilterSkeleton"

export default function PropertiesLoading() {
  return (
    <div className="space-y-6">
      {/* Sticky Header Skeleton */}
      <div className="sticky top-0 z-30 space-y-3 border-b border-border bg-background/80 pt-4 pb-4 backdrop-blur-sm">
        <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-1/4 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex gap-6">
        {/* Sidebar Skeleton */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-20 space-y-4">
            <FilterSkeleton />
          </div>
        </aside>

        {/* Grid Skeleton */}
        <main className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
