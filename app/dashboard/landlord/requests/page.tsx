"use client"

import { motion } from "framer-motion"
import { Search, MoreHorizontal, Check, X, Mail } from "lucide-react"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock Data
const requests = [
  {
    id: "REQ-001",
    applicant: "Sarah Connor",
    email: "sarah.c@example.com",
    property: "Luxury Penthouse Manhattan",
    moveInDate: "2026-09-01",
    status: "Pending",
    message: "I am very interested in this property...",
  },
  {
    id: "REQ-002",
    applicant: "John Smith",
    email: "john.smith@example.com",
    property: "Beachfront Villa",
    moveInDate: "2026-08-15",
    status: "Approved",
    message: "Looking forward to moving in!",
  },
  {
    id: "REQ-003",
    applicant: "Emily Chen",
    email: "emily.chen@example.com",
    property: "City Loft Downtown",
    moveInDate: "2026-10-01",
    status: "Rejected",
    message: "Is the price negotiable?",
  },
  {
    id: "REQ-004",
    applicant: "Michael Brown",
    email: "mbrown@example.com",
    property: "Mountain Cabin",
    moveInDate: "2026-11-15",
    status: "Pending",
    message: "Would love to rent for the winter season.",
  },
]

export default function LandlordRequests() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Rental Requests
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage incoming applications and bookings for your properties.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applicants..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Move-in Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="font-medium">{request.applicant}</div>
                  <div className="text-xs text-muted-foreground">
                    {request.email}
                  </div>
                </TableCell>
                <TableCell>{request.property}</TableCell>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="gap-2">
                        <Mail className="h-4 w-4" /> Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 text-green-600 focus:text-green-600">
                        <Check className="h-4 w-4" /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                        <X className="h-4 w-4" /> Reject
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
