"use client"

import { motion } from "framer-motion"
import { TrendingUp, Calendar, Users, DollarSign, Plus } from "lucide-react"
import Link from "next/link"

export default function LandlordDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      icon: DollarSign,
    },
    { label: "Active Listings", value: "8", change: "+2", icon: TrendingUp },
    {
      label: "Bookings This Month",
      value: "24",
      change: "+8.5%",
      icon: Calendar,
    },
    { label: "Total Guests", value: "156", change: "+23.2%", icon: Users },
  ]

  const properties = [
    {
      id: 1,
      name: "Luxury Penthouse Manhattan",
      location: "New York",
      bookings: 18,
      revenue: "$8,900",
      occupancy: "78%",
      rating: 4.9,
    },
    {
      id: 2,
      name: "Beachfront Villa",
      location: "Miami",
      bookings: 14,
      revenue: "$7,200",
      occupancy: "65%",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Mountain Cabin",
      location: "Colorado",
      bookings: 12,
      revenue: "$5,400",
      occupancy: "55%",
      rating: 4.8,
    },
    {
      id: 4,
      name: "City Loft Downtown",
      location: "San Francisco",
      bookings: 16,
      revenue: "$9,080",
      occupancy: "72%",
      rating: 4.6,
    },
  ]

  const recentBookings = [
    {
      id: 1,
      guest: "John Doe",
      property: "Luxury Penthouse Manhattan",
      checkIn: "2026-08-10",
      status: "Confirmed",
    },
    {
      id: 2,
      guest: "Jane Smith",
      property: "Beachfront Villa",
      checkIn: "2026-08-12",
      status: "Confirmed",
    },
    {
      id: 3,
      guest: "Mike Johnson",
      property: "Mountain Cabin",
      checkIn: "2026-08-15",
      status: "Pending",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            Property Management
          </h1>
          <p className="mt-2 text-muted-foreground">
            Manage your listings and track performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/landlord/properties"
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Manage Properties →
          </Link>
          <Link
            href="/dashboard/landlord/properties/create"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus size={20} />
            <span className="font-medium">List Property</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
      </motion.div>

      {/* Properties Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Your Properties
        </h2>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Property
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Bookings
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Occupancy
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {properties.map((prop, idx) => (
                  <motion.tr
                    key={prop.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="border-b border-border transition-colors hover:bg-secondary/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {prop.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prop.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {prop.bookings}
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground">
                      {prop.revenue}
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-2 w-full rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: prop.occupancy }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-yellow-500">
                        ★ {prop.rating}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-foreground">
          Recent Bookings
        </h2>
        <div className="space-y-3">
          {recentBookings.map((booking, idx) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
            >
              <div>
                <p className="font-semibold text-foreground">{booking.guest}</p>
                <p className="text-sm text-muted-foreground">
                  {booking.property}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">
                  {booking.checkIn}
                </p>
                <span
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-green-500/20 text-green-600"
                      : "bg-yellow-500/20 text-yellow-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
