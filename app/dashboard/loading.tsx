import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[140px]" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
        ))}
      </div>

      {/* Main Content Area Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="flex flex-col rounded-xl border bg-card p-6 shadow-xs lg:col-span-4">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
        
        <div className="flex flex-col rounded-xl border bg-card p-6 shadow-xs lg:col-span-3">
          <div className="mb-6 space-y-2">
            <Skeleton className="h-6 w-[150px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-4 w-[50px]" />
                  </div>
                  <Skeleton className="h-3 w-[180px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
