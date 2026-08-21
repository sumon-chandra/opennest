import { FavoriteProperties } from "@/components/dashboard/tenant/FavoriteProperties"
import { getTenantStats } from "./_actions/dashboard-stats"
import TenantStats from "@/components/dashboard/tenant/TenantStats"
import TenantDashboardHeader from "@/components/dashboard/tenant/TenantDashboardHeader"
import { LatestRentalRequests } from "@/components/dashboard/tenant/LatestRentalRequests"

export default async function TenantDashboard() {
  const tenantStats = await getTenantStats()

  return (
    <div className="space-y-6">
      <TenantDashboardHeader />
      <TenantStats tenantStats={tenantStats?.data!} />
      <LatestRentalRequests
        latestRentalRequests={tenantStats?.data?.latestRentalRequests || []}
      />
      <FavoriteProperties />
    </div>
  )
}
