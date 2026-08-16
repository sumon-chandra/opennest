"use client"

import { useState, useTransition } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  Edit3,
  Trash2,
  MapPin,
  Star,
  Bed,
  Bath,
  AlertTriangle,
  X,
  Loader2,
  MoreHorizontal,
  Eye,
  Link as LinkIcon,
} from "lucide-react"
import { PropertyResponse } from "@/types/property"
import { deleteProperty } from "@/app/dashboard/landlord/_actions/delete-property"
import { toast } from "sonner"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface LandlordPropertiesTableProps {
  properties: PropertyResponse[]
  onDeleted?: (id: string) => void
}

const STATUS_STYLES: Record<string, string> = {
  AVAILABLE: "bg-green-500/15 text-green-700 dark:text-green-400",
  RENTED: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  UNAVAILABLE: "bg-red-500/15 text-red-600 dark:text-red-400",
}

const STATUS_LABELS: Record<string, string> = {
  AVAILABLE: "Available",
  RENTED: "Rented",
  UNAVAILABLE: "Unavailable",
}

interface DeleteDialogProps {
  property: PropertyResponse
  onConfirm: () => void
  onCancel: () => void
  isPending: boolean
}

function DeleteDialog({
  property,
  onConfirm,
  onCancel,
  isPending,
}: DeleteDialogProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/15">
            <AlertTriangle size={20} className="text-destructive" />
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Delete Property
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <strong className="text-foreground">"{property.title}"</strong>?
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <X size={16} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LandlordPropertiesTable({
  properties: initialProperties,
  onDeleted,
}: LandlordPropertiesTableProps) {
  const [properties, setProperties] = useState(initialProperties)
  const [deleteTarget, setDeleteTarget] = useState<PropertyResponse | null>(null)
  const [isPending, startTransition] = useTransition()


  const handleDelete = (property: PropertyResponse) => {
    setDeleteTarget(property)
  }

  const confirmDelete = () => {
    if (!deleteTarget) return

    startTransition(async () => {
      const result = await deleteProperty(deleteTarget.id)
      if (result.success) {
        toast.success("Property deleted successfully")
        setProperties((prev) => prev.filter((p) => p.id !== deleteTarget.id))
        onDeleted?.(deleteTarget.id)
      } else {
        toast.error(result.message || "Failed to delete property")
      }
      setDeleteTarget(null)
    })
  }

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/properties/${id}`)
    toast.success("Property link copied to clipboard")
  }


  if (properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-20 text-center"
      >
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-secondary">
          <MapPin size={28} className="text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">
          No properties yet
        </h3>
        <p className="mb-6 max-w-xs text-sm text-muted-foreground">
          You haven't listed any properties. Create your first listing to start
          earning.
        </p>
        <Link
          href="/dashboard/landlord/properties/create"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          + List Your First Property
        </Link>
      </motion.div>
    )
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/60 hover:bg-secondary/60">
              <TableHead className="px-5 py-3.5">Property</TableHead>
              <TableHead className="px-5 py-3.5">Price</TableHead>
              <TableHead className="px-5 py-3.5">Details</TableHead>
              <TableHead className="px-5 py-3.5">Status</TableHead>
              <TableHead className="px-5 py-3.5">Rating</TableHead>
              <TableHead className="px-5 py-3.5 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {properties.map((prop, idx) => (
                <motion.tr
                  key={prop.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10, height: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="border-b border-border transition-colors last:border-0 hover:bg-muted/50"
                >
                  {/* Property Info */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Link href={`/properties/${prop.id}`}>
                        <Image
                          src={prop.thumbnail ||prop.images[0] || "https://placehold.co/600x400/EEE/31343C.png?text=Property+Image+Unavailable"}
                          alt={prop.title}
                          width={100}
                          height={100}
                          className="object-center object-fill"
                        />
                        </Link>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground line-clamp-1">
                          <Link href={`/properties/${prop.id}`} className="hover:text-muted-foreground/80 ">
                            {prop.title}
                          </Link>
                        </p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={11} />
                          {prop.location}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="px-5 py-4">
                    <span className="font-semibold text-foreground">
                      ${prop.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {" "}
                      /month
                    </span>
                  </TableCell>

                  {/* Details */}
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Bed size={13} />
                        {prop.bedrooms}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={13} />
                        {prop.bathrooms}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[prop.status]}`}
                    >
                      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                      {STATUS_LABELS[prop.status]}
                    </span>
                  </TableCell>

                  {/* Rating */}
                  <TableCell className="px-5 py-4">
                    <span className="flex items-center gap-1 font-medium text-yellow-500">
                      <Star size={14} className="fill-yellow-400" />
                      {prop.rating ? prop.rating.toFixed(1) : "N/A"}
                    </span>
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell className="px-5 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreHorizontal size={16} />
                            <span className="sr-only">Actions</span>
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" sideOffset={5} >
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            render={
                              <Link href={`/properties/${prop.id}`}>
                                <Eye size={14} />
                                View Property
                              </Link>
                            }
                          />
                          <DropdownMenuItem
                            render={
                              <Link href={`/dashboard/landlord/properties/${prop.id}/edit`}>
                                <Edit3 size={14} />
                                Edit Property
                              </Link>
                            }
                          />
                        </DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleCopyLink(prop.id)}
                        >
                          <LinkIcon size={14} />
                          Copy Link
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(prop)}
                        >
                          <Trash2 size={14} />
                          Delete Property
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        <AnimatePresence>
          {properties.map((prop, idx) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: idx * 0.04 }}
              className="overflow-hidden rounded-xl border border-border bg-card"
            >
              <div className="flex gap-3 p-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={prop.thumbnail ||prop.images[0] || "https://placehold.co/600x400/EEE/31343C.png?text=Property+Image+Unavailable"}
                    alt={prop.title}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground line-clamp-1">
                    {prop.title}
                  </p>
                  <p className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={11} />
                    {prop.location}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLES[prop.status]}`}
                    >
                      {STATUS_LABELS[prop.status]}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-yellow-500">
                      <Star size={12} className="fill-yellow-400" />
                      {prop.rating ? prop.rating.toFixed(1) : "N/A"}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      ${prop.price}/night
                    </span>
                  </div>
                </div>
                {/* Mobile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="size-8 shrink-0">
                        <MoreHorizontal size={16} />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" sideOffset={8}>
                    <DropdownMenuItem
                      render={
                        <Link href={`/properties/${prop.id}`}>
                          <Eye size={14} />
                          View
                        </Link>
                      }
                    />
                    <DropdownMenuItem
                      render={
                        <Link href={`/dashboard/landlord/properties/${prop.id}/edit`}>
                          <Edit3 size={14} />
                          Edit
                        </Link>
                      }
                    />
                    <DropdownMenuItem
                      onClick={() => handleCopyLink(prop.id)}
                    >
                      <LinkIcon size={14} />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(prop)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteDialog
            property={deleteTarget}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
            isPending={isPending}
          />
        )}
      </AnimatePresence>
    </>
  )
}
