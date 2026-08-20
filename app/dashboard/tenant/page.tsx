"use client"

import { FavoriteProperties } from "@/components/dashboard/tenant/FavoriteProperties"
import { motion } from "framer-motion"
import { Calendar, MapPin, Star, Heart } from "lucide-react"

export default function TenantDashboard() {

  const stats = [
    { label: "Active Bookings", value: "3", icon: Calendar },
    { label: "Completed Stays", value: "12", icon: MapPin },
    { label: "Average Rating", value: "4.8", icon: Star },
    {
      label: "Saved Properties",
      value: 10,
      icon: Heart,
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      propertyName: "Luxury Penthouse Manhattan",
      location: "New York",
      checkIn: "2026-08-15",
      checkOut: "2026-08-22",
      status: "Confirmed",
      total: "$3,500",
    },
    {
      id: 2,
      propertyName: "Beachfront Villa",
      location: "Miami",
      checkIn: "2026-09-01",
      checkOut: "2026-09-08",
      status: "Pending",
      total: "$4,200",
    },
    {
      id: 3,
      propertyName: "Mountain Cabin",
      location: "Colorado",
      checkIn: "2026-09-15",
      checkOut: "2026-09-20",
      status: "Confirmed",
      total: "$2,800",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          Welcome to Your Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your bookings and discover new properties
        </p>
      </motion.div>

      {/* Stats Grid */}
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

      {/* Upcoming Bookings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Upcoming Bookings
        </h2>
        <div className="space-y-4">
          {upcomingBookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {booking.propertyName}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                    <MapPin size={16} /> {booking.location}
                  </p>
                  <div className="mt-3 flex flex-col gap-4 text-sm md:flex-row">
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Check-in:
                      </span>{" "}
                      {booking.checkIn}
                    </p>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Check-out:
                      </span>{" "}
                      {booking.checkOut}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {booking.total}
                  </p>
                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-500/20 text-green-600"
                        : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Saved Properties Section */}
     <FavoriteProperties />
    </div>
  )
}
