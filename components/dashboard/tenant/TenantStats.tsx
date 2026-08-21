"use client"
import { motion } from "framer-motion"
import type { TenantStats } from "@/types/user"
import { Calendar, MapPin, Star, Heart } from "lucide-react"

interface TenantStatsProps {
  tenantStats: TenantStats
}
const TenantStats = ({ tenantStats }: TenantStatsProps) => {
  const stats = [
    {
      label: "Total Booked",
      value: tenantStats?.totalBooked ?? 0,
      icon: Calendar,
    },
    {
      label: "Total Pendings",
      value: tenantStats?.totalPendingRequests ?? 0,
      icon: MapPin,
    },
    {
      label: "Total Saved Properties",
      value: tenantStats?.totalSavedProperties ?? 0,
      icon: Heart,
    },
    {
      label: "Total Invested Amount",
      value: tenantStats?.totalInvestedAmount ?? 0,
      icon: Star,
    },
  ]
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            whileHover={{ y: -5 }}
            className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
              <Icon className="text-primary" size={24} />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default TenantStats
