import DashboardHeader from "@/components/dashboard/landlord/DashboardHeader"
import DashboardStats from "@/components/dashboard/landlord/DashboardStats"
import DashboardProperties from "@/components/dashboard/landlord/DashboardProperties"
import DashboardRecentBookings from "@/components/dashboard/landlord/DashboardRecentBookings"
import { getMyProperties } from "./_actions/get-my-properties"

export default async function LandlordDashboard() {
  const landlordProperties = await getMyProperties()
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats meta={landlordProperties?.meta || { totalRevenue: 0, activeProperties: 0, totalBookingsThisMonth: 0 }} />
      <DashboardProperties properties={landlordProperties?.data || []} />
      <DashboardRecentBookings recentBookings={landlordProperties?.meta?.recentBookings || []} />
    </div>
  )
}
