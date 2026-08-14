"use client"

import { ImagePlus, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface ImageUploaderProps {
  value: string | File | null
  onChange: (file: File | string | null) => void
  label?: string
}

export function ImageUploader({
  value,
  onChange,
  label = "Thumbnail Image",
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Generate object URL for preview if value is a File
    if (value instanceof File) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else if (typeof value === "string" && value) {
      setPreview(value)
    } else {
      setPreview(null)
    }
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
    }
    // Reset input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent clicking the parent div which might trigger upload (though we don't have one here)
    onChange(null)
  }

  return (
    <div>
      {preview ? (
        /* Preview */
        <div className="group relative overflow-hidden rounded-xl border border-border">
          <div className="relative h-52 w-full">
            <Image
              src={preview}
              alt="Property thumbnail preview"
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
            />
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-all hover:scale-110 hover:bg-white hover:text-destructive"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent px-4 py-3">
            <p className="text-xs font-medium text-white/90">
              ✓ Thumbnail selected
            </p>
          </div>
        </div>
      ) : (
        /* Upload zone */
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-52 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/30 text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
          >
            <ImagePlus size={32} />
            <div className="text-center">
              <p className="text-sm font-semibold">Click to upload {label}</p>
              <p className="mt-0.5 text-xs">JPG, PNG, WebP — max 5 MB</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
