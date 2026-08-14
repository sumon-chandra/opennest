import Link from "next/link"
import { Plus, Building2, CheckCircle2, XCircle, Key } from "lucide-react"
import { getMyProperties } from "@/app/dashboard/landlord/_actions/get-my-properties"
import { LandlordPropertiesTable } from "@/components/dashboard/LandlordPropertiesTable"

export const metadata = {
  title: "My Properties | OpenNest Landlord",
  description: "Manage all your property listings on OpenNest.",
}

export default async function LandlordPropertiesPage() {
  const result = await getMyProperties()
  const properties = result.data ?? []

  const totalCount = properties.length
  const availableCount = properties.filter(
    (p) => p.status === "AVAILABLE",
  ).length
  const rentedCount = properties.filter((p) => p.status === "RENTED").length
  const unavailableCount = properties.filter(
    (p) => p.status === "UNAVAILABLE",
  ).length

  const stats = [
    {
      label: "Total Listings",
      value: totalCount,
      icon: Building2,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Available",
      value: availableCount,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-500/10",
    },
    {
      label: "Rented",
      value: rentedCount,
      icon: Key,
      color: "text-blue-600",
      bg: "bg-blue-500/10",
    },
    {
      label: "Unavailable",
      value: unavailableCount,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            My Properties
          </h1>
          <p className="mt-1.5 text-muted-foreground">
            {totalCount === 0
              ? "You haven't listed any properties yet."
              : `Managing ${totalCount} propert${totalCount === 1 ? "y" : "ies"}`}
          </p>
        </div>
        <Link
          href="/dashboard/landlord/properties/create"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}
              >
                <Icon size={20} className={stat.color} />
              </span>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Properties Table */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            All Properties
          </h2>
          {totalCount > 0 && (
            <p className="text-sm text-muted-foreground">
              {totalCount} listing{totalCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <LandlordPropertiesTable properties={properties} />
      </div>
    </div>
  )
}
