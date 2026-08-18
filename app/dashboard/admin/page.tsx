"use client"

import { motion } from "framer-motion"
import { Users, Building, DollarSign, ShieldAlert, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+14%", icon: Users },
    { label: "Active Properties", value: "842", change: "+5%", icon: Building },
    { label: "Platform Revenue", value: "$124,500", change: "+22%", icon: DollarSign },
    { label: "Pending Reviews", value: "15", change: "-2", icon: ShieldAlert },
  ]

  return (
    <div className="space-y-8 p-6">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-muted-foreground mb-4">
              <span className="text-sm font-medium">{stat.label}</span>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-amber-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-xs">
          <h2 className="text-lg font-semibold mb-4">Recent System Alerts</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start pb-4 border-b">
              <ShieldAlert className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-medium text-sm">Suspicious activity detected</p>
                <p className="text-sm text-muted-foreground">Multiple failed login attempts from IP 192.168.1.5</p>
                <p className="text-xs text-muted-foreground mt-1">10 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Users className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-sm">New Landlord Registration</p>
                <p className="text-sm text-muted-foreground">Pending identity verification for 'Elite Properties LLC'</p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-xs bg-primary text-primary-foreground">
          <h2 className="text-lg font-semibold mb-2">System Health</h2>
          <p className="text-primary-foreground/80 mb-6">All systems are operational.</p>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Database Load</span>
                <span>42%</span>
              </div>
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary-foreground w-[42%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Storage</span>
                <span>78%</span>
              </div>
              <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-[78%] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
