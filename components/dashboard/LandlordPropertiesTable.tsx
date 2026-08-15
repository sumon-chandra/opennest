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
} from "lucide-react"
import { Property } from "@/types/property"
import { deleteProperty } from "@/app/dashboard/landlord/_actions/delete-property"
import { toast } from "sonner"

interface LandlordPropertiesTableProps {
  properties: Property[]
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
  property: Property
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
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleDelete = (property: Property) => {
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60">
                <th className="px-5 py-3.5 text-left font-semibold text-foreground">
                  Property
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-foreground">
                  Price
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-foreground">
                  Details
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-foreground">
                  Status
                </th>
                <th className="px-5 py-3.5 text-left font-semibold text-foreground">
                  Rating
                </th>
                <th className="px-5 py-3.5 text-right font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {properties.map((prop, idx) => (
                  <motion.tr
                    key={prop.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10, height: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-border transition-colors last:border-0 hover:bg-secondary/30"
                  >
                    {/* Property Info */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={prop.thumbnail}
                            alt={prop.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground line-clamp-1">
                            {prop.title}
                          </p>
                          <p className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={11} />
                            {prop.location}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4">
                      <span className="font-semibold text-foreground">
                        ${prop.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {" "}
                        /night
                      </span>
                    </td>

                    {/* Details */}
                    <td className="px-5 py-4">
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
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[prop.status]}`}
                      >
                        <span className="mr-1.5 size-1.5 rounded-full bg-current" />
                        {STATUS_LABELS[prop.status]}
                      </span>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 font-medium text-yellow-500">
                        <Star size={14} className="fill-yellow-400" />
                        {prop.rating ? prop.rating.toFixed(1) : "N/A"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/landlord/properties/${prop.id}/edit`}
                          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                        >
                          <Edit3 size={13} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(prop)}
                          className="flex items-center gap-1.5 rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                        >
                          <Trash2 size={13} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
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
                    src={prop.thumbnail}
                    alt={prop.title}
                    fill
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
              </div>
              <div className="flex border-t border-border">
                <Link
                  href={`/dashboard/landlord/properties/${prop.id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <Edit3 size={13} /> Edit
                </Link>
                <div className="w-px bg-border" />
                <button
                  onClick={() => handleDelete(prop)}
                  className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 size={13} /> Delete
                </button>
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
