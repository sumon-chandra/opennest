"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const revenueData = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 3200 },
  { name: "Mar", total: 5800 },
  { name: "Apr", total: 4100 },
  { name: "May", total: 6000 },
  { name: "Jun", total: 7200 },
  { name: "Jul", total: 8500 },
]

const occupancyData = [
  { name: "Jan", rate: 65 },
  { name: "Feb", rate: 59 },
  { name: "Mar", rate: 80 },
  { name: "Apr", rate: 71 },
  { name: "May", rate: 85 },
  { name: "Jun", rate: 92 },
  { name: "Jul", rate: 95 },
]

export default function LandlordReporting() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reporting & Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Insights into your property performance and financials.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="font-semibold leading-none tracking-tight">
              Revenue Over Time
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Monthly rental income across all properties
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" fill="var(--color-primary, #2563eb)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <div className="mb-4">
            <h3 className="font-semibold leading-none tracking-tight">
              Occupancy Rates
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Average occupancy percentage per month
            </p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="var(--color-primary, #2563eb)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-primary, #2563eb)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
