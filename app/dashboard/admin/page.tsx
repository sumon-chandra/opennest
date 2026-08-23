"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import {
  Users,
  Building,
  DollarSign,
  Star,
  TrendingUp,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { getAdminStatistics } from "@/services/admin.service"
import { formatCurrency } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const ROLE_COLORS: Record<string, string> = {
  TENANT: "hsl(210, 80%, 55%)",
  LANDLORD: "hsl(150, 60%, 45%)",
  ADMIN: "hsl(280, 65%, 55%)",
}

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "hsl(150, 60%, 45%)",
  BANNED: "hsl(0, 70%, 55%)",
  AVAILABLE: "hsl(150, 60%, 45%)",
  RENTED: "hsl(210, 80%, 55%)",
  UNAVAILABLE: "hsl(0, 70%, 55%)",
  COMPLETED: "hsl(150, 60%, 45%)",
  PENDING: "hsl(40, 90%, 55%)",
  APPROVED: "hsl(210, 80%, 55%)",
}

const roleChartConfig: ChartConfig = {
  TENANT: { label: "Tenants", color: ROLE_COLORS.TENANT },
  LANDLORD: { label: "Landlords", color: ROLE_COLORS.LANDLORD },
  ADMIN: { label: "Admins", color: ROLE_COLORS.ADMIN },
}

const propertyChartConfig: ChartConfig = {
  AVAILABLE: { label: "Available", color: STATUS_COLORS.AVAILABLE },
  RENTED: { label: "Rented", color: STATUS_COLORS.RENTED },
  UNAVAILABLE: { label: "Unavailable", color: STATUS_COLORS.UNAVAILABLE },
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-statistics"],
    queryFn: () => getAdminStatistics(),
  })

  const stats = data?.data

  const summaryCards = [
    {
      label: "Total Users",
      value: stats?.users.total ?? 0,
      format: (v: number) => v.toLocaleString(),
      icon: Users,
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-500",
    },
    {
      label: "Total Properties",
      value: stats?.properties.total ?? 0,
      format: (v: number) => v.toLocaleString(),
      icon: Building,
      gradient: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-500",
    },
    {
      label: "Total Revenue",
      value: stats?.financials.totalRevenue ?? 0,
      format: (v: number) => formatCurrency(v),
      icon: DollarSign,
      gradient: "from-amber-500/10 to-amber-600/5",
      iconColor: "text-amber-500",
    },
    {
      label: "Total Reviews",
      value: stats?.engagement.totalReviews ?? 0,
      format: (v: number) => v.toLocaleString(),
      icon: Star,
      gradient: "from-violet-500/10 to-violet-600/5",
      iconColor: "text-violet-500",
    },
  ]

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center space-y-4">
          <p className="text-destructive font-medium">Failed to load statistics</p>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Platform Overview
          </h1>
          <p className="mt-2 text-muted-foreground">
            High-level metrics and system status for OpenNest.
          </p>
        </div>
        <Button className="gap-2">
          <TrendingUp className="h-4 w-4" /> Generate Report
        </Button>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {summaryCards.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${card.gradient} bg-card p-6 shadow-xs transition-shadow hover:shadow-md`}
          >
            <div className="flex items-center justify-between text-muted-foreground mb-4">
              <span className="text-sm font-medium">{card.label}</span>
              <div className={`rounded-lg bg-background/80 p-2 ${card.iconColor}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <div>
              {isLoading ? (
                <Skeleton className="h-9 w-28" />
              ) : (
                <h2 className="text-3xl font-bold tabular-nums">
                  {card.format(card.value)}
                </h2>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Users by Role — Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-card p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold mb-1">Users by Role</h2>
          <p className="text-sm text-muted-foreground mb-6">Distribution of users across platform roles</p>

          {isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : stats?.users.byRole ? (
            <ChartContainer config={roleChartConfig} className="mx-auto h-[250px] w-full">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={stats.users.byRole.map((item) => ({
                    name: item.role,
                    value: item.count,
                    fill: ROLE_COLORS[item.role] || "hsl(220, 10%, 50%)",
                  }))}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                  strokeWidth={2}
                  stroke="hsl(var(--background))"
                >
                  {stats.users.byRole.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ROLE_COLORS[item.role] || "hsl(220, 10%, 50%)"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No data</p>
          )}

          {/* Legend */}
          {stats?.users.byRole && (
            <div className="flex items-center justify-center gap-6 mt-4">
              {stats.users.byRole.map((item) => (
                <div key={item.role} className="flex items-center gap-2 text-sm">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: ROLE_COLORS[item.role] }}
                  />
                  <span className="text-muted-foreground capitalize">{item.role.toLowerCase()}s</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Properties by Status — Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border bg-card p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold mb-1">Properties by Status</h2>
          <p className="text-sm text-muted-foreground mb-6">Current property availability breakdown</p>

          {isLoading ? (
            <div className="flex items-center justify-center h-[250px]">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : stats?.properties.byStatus ? (
            <ChartContainer config={propertyChartConfig} className="h-[250px] w-full">
              <BarChart
                data={stats.properties.byStatus.map((item) => ({
                  status: item.status.charAt(0) + item.status.slice(1).toLowerCase(),
                  count: item.count,
                  fill: STATUS_COLORS[item.status] || "hsl(220, 10%, 50%)",
                }))}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="status" className="text-xs" />
                <YAxis className="text-xs" allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} strokeWidth={0}>
                  {stats.properties.byStatus.map((item, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={STATUS_COLORS[item.status] || "hsl(220, 10%, 50%)"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No data</p>
          )}
        </motion.div>
      </div>

      {/* Bottom Row — Status Summaries */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Users by Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border bg-card p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold mb-4">User Status</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {stats?.users.byStatus.map((item) => {
                const percentage = stats.users.total
                  ? Math.round((item.count / stats.users.total) * 100)
                  : 0
                return (
                  <div key={item.status}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground capitalize">
                        {item.status.toLowerCase()}
                      </span>
                      <span className="font-medium tabular-nums">
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: STATUS_COLORS[item.status] || "hsl(220, 10%, 50%)",
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Financial Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-xl border bg-card p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-2xl font-bold tabular-nums">
                  {formatCurrency(stats?.financials.totalRevenue ?? 0)}
                </p>
              </div>
              <div className="space-y-3">
                {stats?.financials.byStatus.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor: STATUS_COLORS[item.status] || "hsl(220, 10%, 50%)",
                        }}
                      />
                      <span className="text-sm capitalize">{item.status.toLowerCase()}</span>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Rental Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-xl border bg-card p-6 shadow-xs"
        >
          <h2 className="text-lg font-semibold mb-4">Rental Requests</h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                <p className="text-2xl font-bold tabular-nums">
                  {stats?.rentalRequests.total?.toLocaleString() ?? 0}
                </p>
              </div>
              <div className="space-y-3">
                {stats?.rentalRequests.byStatus.map((item) => {
                  const percentage = stats.rentalRequests.total
                    ? Math.round((item.count / stats.rentalRequests.total) * 100)
                    : 0
                  return (
                    <div key={item.status}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted-foreground capitalize">
                          {item.status.toLowerCase()}
                        </span>
                        <span className="font-medium tabular-nums">
                          {item.count} ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: STATUS_COLORS[item.status] || "hsl(220, 10%, 50%)",
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
