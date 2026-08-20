import { Skeleton } from "@/components/ui/skeleton"

export default function LandlordDashboardLoading() {
  return (
    <div className="space-y-8">
      {/* DashboardHeader Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-10 w-64 rounded-md md:w-80" />
          <Skeleton className="mt-2 h-5 w-48 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-40 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* DashboardStats Skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center rounded-xl border border-border bg-card p-6"
          >
            <Skeleton className="mr-4 h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-6 w-32 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* DashboardProperties Skeleton */}
      <div>
        <Skeleton className="mb-6 h-8 w-48 rounded-md" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-2/3 rounded-md" />
                  <Skeleton className="h-6 w-1/4 rounded-md" />
                </div>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-24 rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <Skeleton className="h-6 w-1/3 rounded-md" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DashboardRecentBookings Skeleton */}
      <div>
        <Skeleton className="mb-4 h-8 w-48 rounded-md" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-48 rounded-md" />
              </div>
              <div className="flex flex-col items-end space-y-2 text-right">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
