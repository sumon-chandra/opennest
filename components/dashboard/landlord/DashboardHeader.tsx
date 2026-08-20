"use client"

import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardHeader() {
  return (
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
  )
}
