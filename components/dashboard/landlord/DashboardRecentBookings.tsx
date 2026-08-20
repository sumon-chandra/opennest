"use client"

import { RecentBooking } from "@/types/property"
import { motion } from "framer-motion"
import PropertyNotFound from "../PropertyNotFound"

export default function DashboardRecentBookings({
  recentBookings
}: {
  recentBookings: RecentBooking[]
}) {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="mb-4 text-2xl font-bold text-foreground">
        Recent Bookings
      </h2>
      <div className="space-y-3">
        {recentBookings.length === 0 ? (
          <PropertyNotFound title="No recent bookings found." description="Be the first to get a booking!" />
        ) : (
          recentBookings.map((booking, idx) => (
            <motion.div
              key={booking.property.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
            >
              <div>
                <p className="font-semibold text-foreground">{booking.tenant.name}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.property.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {booking.payment?.paidAt}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    booking.payment?.status === "PAID"
                      ? "bg-green-500/20 text-green-600"
                      : booking.payment?.status === "PENDING"
                      ? "bg-yellow-500/20 text-yellow-600"
                      : "bg-red-500/20 text-red-600"
                  }`}
                >
                  {booking.payment?.status}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  )
}
