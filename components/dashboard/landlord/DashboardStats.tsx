"use client"

import MotionDiv from "@/components/common/MotionDiv"
import { formatCurrency } from "@/lib/utils"
import { PropertyMeta } from "@/types/property"
import { motion } from "framer-motion"
import { TrendingUp, Calendar, Users, DollarSign } from "lucide-react"

export default function DashboardStats({meta}: {meta: PropertyMeta}) {
  const stats = [
    {
      label: "Total Revenue",
      value: formatCurrency(meta.totalRevenue),
      change: "+12.5%",
      icon: DollarSign,
    },
    { label: "Active Listings", value: meta.activeProperties, change: "+2", icon: TrendingUp },
    {
      label: "Bookings This Month",
      value: meta.totalBookingsThisMonth.toString(),
      change: "+8.5%",
      icon: Calendar,
    },
    { label: "Total Guests", value: (156).toString(), change: "+23.2%", icon: Users },
  ]

  return (
    <MotionDiv
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((stat) => {
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
                <p className="mt-2 text-sm font-medium text-green-600">
                  {stat.change}
                </p>
              </div>
              <Icon className="text-primary" size={24} />
            </div>
          </motion.div>
        )
      })}
    </MotionDiv>
  )
}
