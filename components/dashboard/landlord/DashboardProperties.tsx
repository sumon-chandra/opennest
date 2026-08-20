"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PropertyResponse } from "@/types/property"
import { motion } from "framer-motion"

export default function DashboardProperties({properties}: {properties: PropertyResponse[]}) {


  return (
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
          <Table className="w-full">
            <TableHeader>
              <TableRow className="border-b border-border bg-secondary">
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Property
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Bookings
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Revenue
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Rating
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop, idx) => (
                  <TableRow key={prop.id}>
                  <TableCell className="px-6 py-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {prop.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {prop.location}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-foreground">
                     {prop._count.rentalRequests}
                  </TableCell>
                  <TableCell className="px-6 py-4 font-medium text-foreground">
                    {prop.revenue}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    {prop.status}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="font-medium text-yellow-500">
                      ★ {prop.rating}
                    </span>
                  </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  )
}
