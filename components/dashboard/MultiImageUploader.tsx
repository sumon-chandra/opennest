"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Images } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface MultiImageUploaderProps {
  values: (File | string)[]
  onChange: (files: (File | string)[]) => void
  maxFiles?: number
}

// Helper component to manage object URLs for files to avoid memory leaks
function PreviewImage({
  item,
  index,
  onRemove,
}: {
  item: File | string
  index: number
  onRemove: () => void
}) {
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => {
    if (item instanceof File) {
      const url = URL.createObjectURL(item)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(item) // It's already a URL string (from edit mode)
    }
  }, [item])

  if (!preview) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-muted"
    >
      <Image
        src={preview}
        alt={`Property image ${index + 1}`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-destructive"
      >
        <X size={12} />
      </button>
      {/* Index badge */}
      <div className="absolute bottom-1.5 left-1.5 rounded bg-black/50 px-1.5 py-0.5 text-xs font-medium text-white">
        {index + 1}
      </div>
    </motion.div>
  )
}

export function MultiImageUploader({
  values,
  onChange,
  maxFiles = 8,
}: MultiImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      // Prevent exceeding maxFiles
      const availableSlots = maxFiles - values.length
      const filesToAdd = files.slice(0, availableSlots)
      onChange([...values, ...filesToAdd])
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  const canAddMore = values.length < maxFiles

  return (
    <div className="space-y-3">
      {/* Image Grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence>
            {values.map((item, index) => (
              <PreviewImage
                // Use the file name + size or URL as key to ensure uniqueness during re-renders
                key={item instanceof File ? `${item.name}-${item.size}-${index}` : `${item}-${index}`}
                item={item}
                index={index}
                onRemove={() => removeImage(index)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Upload Button */}
      {canAddMore && (
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-border py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary ${
              values.length === 0 ? "h-28" : "h-16"
            }`}
          >
            {values.length === 0 ? (
              <div className="flex flex-col items-center gap-2">
                <Images size={28} />
                <span>Click to add gallery images</span>
                <span className="text-xs opacity-70">
                  Up to {maxFiles} photos — JPG, PNG, WebP
                </span>
              </div>
            ) : (
              <>
                <Plus size={18} />
                Add more images ({values.length}/{maxFiles})
              </>
            )}
          </button>
        </div>
      )}

      {/* Full indicator */}
      {!canAddMore && (
        <p className="text-center text-xs text-muted-foreground">
          Maximum {maxFiles} images reached.{" "}
          <button
            type="button"
            onClick={() => removeImage(values.length - 1)}
            className="text-primary underline underline-offset-2"
          >
            Remove last
          </button>{" "}
          to add more.
        </p>
      )}
    </div>
  )
}
