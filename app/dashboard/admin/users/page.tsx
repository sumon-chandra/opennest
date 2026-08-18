"use client"

import { motion } from "framer-motion"
import { Search, MoreHorizontal, UserCheck, UserX, Shield } from "lucide-react"
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
const users = [
  {
    id: "USR-001",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Landlord",
    status: "Active",
    joinedDate: "2024-02-15",
  },
  {
    id: "USR-002",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Tenant",
    status: "Active",
    joinedDate: "2025-11-20",
  },
  {
    id: "USR-003",
    name: "Charlie Davis",
    email: "charlie.d@example.com",
    role: "Tenant",
    status: "Banned",
    joinedDate: "2026-01-10",
  },
  {
    id: "USR-004",
    name: "Elite Properties LLC",
    email: "contact@eliteprops.com",
    role: "Landlord",
    status: "Pending",
    joinedDate: "2026-08-18",
  },
]

export default function AdminUsers() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground mt-2">
            View and manage all landlords and tenants on the platform.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className={`h-4 w-4 ${user.role === 'Landlord' ? 'text-primary' : 'text-muted-foreground'}`} />
                    {user.role}
                  </div>
                </TableCell>
                <TableCell>{user.joinedDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "default"
                        : user.status === "Banned"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {user.status}
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
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.status !== 'Active' && (
                        <DropdownMenuItem className="gap-2 text-green-600 focus:text-green-600">
                          <UserCheck className="h-4 w-4" /> Verify / Activate
                        </DropdownMenuItem>
                      )}
                      {user.status !== 'Banned' && (
                        <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                          <UserX className="h-4 w-4" /> Suspend User
                        </DropdownMenuItem>
                      )}
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
