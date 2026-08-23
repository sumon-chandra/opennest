import { MoreHorizontal, UserCheck, UserX, Shield, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/types/user"
import type { UserStatus } from "@/types"
import { UseMutationResult } from "@tanstack/react-query"
import UsersTableSkeleton from "./UsersTableSkeleton"

type UsersTableProps = {
  users: User[]
  isLoading: boolean
  handleStatusToggle: (userId: string, currentStatus: string) => void
  statusMutation: UseMutationResult<
    any,
    Error,
    { userId: string; status: UserStatus },
    unknown
  >
}

const UsersTable = ({
  users,
  isLoading,
  handleStatusToggle,
  statusMutation,
}: UsersTableProps) => {
  return (
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
          {isLoading ? (
            <UsersTableSkeleton count={5} />
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-12 text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield
                      className={`h-4 w-4 ${
                        user.role === "LANDLORD"
                          ? "text-primary"
                          : user.role === "ADMIN"
                            ? "text-violet-500"
                            : "text-muted-foreground"
                      }`}
                    />
                    <span className="capitalize">
                      {user.role.toLowerCase()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "ACTIVE" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" className="h-8 w-8 p-0" />
                      }
                    >
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      {user.status === "ACTIVE" ? (
                        <DropdownMenuItem
                          className="gap-2 text-destructive focus:text-destructive"
                          disabled={statusMutation.isPending}
                          onClick={() =>
                            handleStatusToggle(user.id, user.status)
                          }
                        >
                          {statusMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserX className="h-4 w-4" />
                          )}
                          Ban User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          className="gap-2 text-green-600 focus:text-green-600"
                          disabled={statusMutation.isPending}
                          onClick={() =>
                            handleStatusToggle(user.id, user.status)
                          }
                        >
                          {statusMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                          Unban User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default UsersTable
