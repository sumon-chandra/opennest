"use client"

import { motion } from "framer-motion"
import { Search, Eye, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock Data
const myRequests = [
  {
    id: "REQ-901",
    property: "Downtown Studio Apartment",
    landlord: "Alice Johnson",
    dateApplied: "2026-08-10",
    status: "Pending",
    moveInDate: "2026-09-01",
  },
  {
    id: "REQ-902",
    property: "Luxury Penthouse Manhattan",
    landlord: "Robert Smith",
    dateApplied: "2026-07-15",
    status: "Approved",
    moveInDate: "2026-08-01",
  },
  {
    id: "REQ-903",
    property: "Suburban Family Home",
    landlord: "Emily Chen",
    dateApplied: "2026-06-20",
    status: "Rejected",
    moveInDate: "2026-07-15",
  },
]

export default function TenantRequests() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Rental Applications
          </h1>
          <p className="text-muted-foreground mt-2">
            Track the status of your property rental applications.
          </p>
        </div>
        <Button>Find More Properties</Button>
      </motion.div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.property}</TableCell>
                <TableCell>{request.landlord}</TableCell>
                <TableCell>{request.dateApplied}</TableCell>
                <TableCell>{request.moveInDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "Approved"
                        ? "default"
                        : request.status === "Rejected"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {request.status === "Pending" && (
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Withdraw Application">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
