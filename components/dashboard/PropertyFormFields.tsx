"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Trash2,
  ImageIcon,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Ruler,
  FileText,
  Tag,
  Wifi,
  UtensilsCrossed,
  Wind,
  Waves,
  Dumbbell,
  Droplets,
  Flame,
  PawPrint,
  ArrowUp,
  ParkingCircle,
  CheckSquare,
} from "lucide-react"
import { AMENITIES, LOCATIONS } from "@/lib/constants"
import { type PropertyFormValues } from "@/lib/property-schema"

// Icon map for amenities
const amenityIconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={14} />,
  UtensilsCrossed: <UtensilsCrossed size={14} />,
  Wind: <Wind size={14} />,
  ParkingCircle: <ParkingCircle size={14} />,
  Waves: <Waves size={14} />,
  Dumbbell: <Dumbbell size={14} />,
  Droplets: <Droplets size={14} />,
  Flame: <Flame size={14} />,
  PawPrint: <PawPrint size={14} />,
  ArrowUp: <ArrowUp size={14} />,
}

const PROPERTY_STATUSES = [
  { value: "AVAILABLE", label: "Available", color: "text-green-600" },
  { value: "RENTED", label: "Rented", color: "text-blue-600" },
  { value: "UNAVAILABLE", label: "Unavailable", color: "text-red-600" },
]

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
const labelClass = "mb-1.5 block text-sm font-medium text-foreground"
const errorClass = "mt-1 text-xs text-destructive"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function FormSection({ title, icon, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="mb-5 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}

export function PropertyFormFields() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PropertyFormValues>()

  const { fields, append, remove } = useFieldArray<PropertyFormValues>({
    name: "images",
  })

  const selectedAmenities = watch("amenities") ?? []
  const selectedStatus = watch("status")

  const toggleAmenity = (amenityId: string) => {
    const current = selectedAmenities
    if (current.includes(amenityId)) {
      setValue(
        "amenities",
        current.filter((a) => a !== amenityId),
        { shouldDirty: true },
      )
    } else {
      setValue("amenities", [...current, amenityId], { shouldDirty: true })
    }
  }

  return (
    <div className="space-y-5">
      {/* Basic Info */}
      <FormSection title="Basic Information" icon={<FileText size={16} />}>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className={labelClass}>
              Property Title <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              {...register("title")}
              placeholder="e.g. Luxury Penthouse with Ocean View"
              className={inputClass}
            />
            {errors.title && (
              <p className={errorClass}>{errors.title.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows={4}
              placeholder="Describe your property — unique features, neighborhood, nearby attractions..."
              className={`${inputClass} resize-none`}
            />
            {errors.description && (
              <p className={errorClass}>{errors.description.message}</p>
            )}
          </div>
        </div>
      </FormSection>

      {/* Location & Pricing */}
      <FormSection title="Location & Pricing" icon={<MapPin size={16} />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="location" className={labelClass}>
              Location <span className="text-destructive">*</span>
            </label>
            <select
              id="location"
              {...register("location")}
              className={inputClass}
            >
              <option value="">Select a city...</option>
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            {errors.location && (
              <p className={errorClass}>{errors.location.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className={labelClass}>
              Price per Night ($) <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <DollarSign
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="price"
                type="number"
                min={0}
                step={0.01}
                {...register("price", { valueAsNumber: true })}
                placeholder="0.00"
                className={`${inputClass} pl-9`}
              />
            </div>
            {errors.price && (
              <p className={errorClass}>{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="area" className={labelClass}>
              Area (sqft)
            </label>
            <div className="relative">
              <Ruler
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="area"
                type="number"
                min={0}
                {...register("area", { valueAsNumber: true })}
                placeholder="e.g. 1200"
                className={`${inputClass} pl-9`}
              />
            </div>
          </div>

          <div>
            <label htmlFor="categoryId" className={labelClass}>
              Category ID <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Tag
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="categoryId"
                {...register("categoryId")}
                placeholder="e.g. cat_apartment"
                className={`${inputClass} pl-9`}
              />
            </div>
            {errors.categoryId && (
              <p className={errorClass}>{errors.categoryId.message}</p>
            )}
          </div>
        </div>
      </FormSection>

      {/* Property Details */}
      <FormSection title="Property Details" icon={<BedDouble size={16} />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="bedrooms" className={labelClass}>
              Bedrooms <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <BedDouble
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="bedrooms"
                type="number"
                min={0}
                {...register("bedrooms", { valueAsNumber: true })}
                placeholder="e.g. 3"
                className={`${inputClass} pl-9`}
              />
            </div>
            {errors.bedrooms && (
              <p className={errorClass}>{errors.bedrooms.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="bathrooms" className={labelClass}>
              Bathrooms <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Bath
                size={16}
                className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="bathrooms"
                type="number"
                min={0}
                step={0.5}
                {...register("bathrooms", { valueAsNumber: true })}
                placeholder="e.g. 2"
                className={`${inputClass} pl-9`}
              />
            </div>
            {errors.bathrooms && (
              <p className={errorClass}>{errors.bathrooms.message}</p>
            )}
          </div>
        </div>
      </FormSection>

      {/* Amenities */}
      <FormSection title="Amenities" icon={<CheckSquare size={16} />}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {AMENITIES.map((amenity) => {
            const isSelected = selectedAmenities.includes(amenity.id)
            return (
              <button
                key={amenity.id}
                type="button"
                onClick={() => toggleAmenity(amenity.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span className="shrink-0">
                  {amenityIconMap[amenity.icon] ?? <CheckSquare size={14} />}
                </span>
                <span className="truncate font-medium">{amenity.name}</span>
              </button>
            )
          })}
        </div>
      </FormSection>

      {/* Media */}
      <FormSection title="Media" icon={<ImageIcon size={16} />}>
        <div className="space-y-4">
          <div>
            <label htmlFor="thumbnail" className={labelClass}>
              Thumbnail URL <span className="text-destructive">*</span>
            </label>
            <input
              id="thumbnail"
              {...register("thumbnail")}
              placeholder="https://example.com/image.jpg"
              className={inputClass}
            />
            {errors.thumbnail && (
              <p className={errorClass}>{errors.thumbnail.message}</p>
            )}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className={`${labelClass} mb-0`}>Additional Images</label>
              <button
                type="button"
                onClick={() => append({ url: "" })}
                className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
              >
                <Plus size={14} />
                Add Image
              </button>
            </div>

            <div className="space-y-2">
              <AnimatePresence>
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <input
                      {...register(`images.${index}.url`)}
                      placeholder={`Image URL ${index + 1}`}
                      className={`${inputClass} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="flex shrink-0 items-center justify-center rounded-lg border border-border p-2.5 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {fields.length === 0 && (
                <p className="py-2 text-center text-sm text-muted-foreground">
                  No additional images added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </FormSection>

      {/* Status & Visibility */}
      <FormSection title="Status & Visibility" icon={<Tag size={16} />}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>
              Status <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {PROPERTY_STATUSES.map((s) => (
                <label
                  key={s.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-all ${
                    selectedStatus === s.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    value={s.value}
                    {...register("status")}
                    className="accent-primary"
                  />
                  <span className={`text-sm font-medium ${s.color}`}>
                    {s.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Featured Listing</label>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-4 py-4 transition-all hover:border-primary/40">
              <input
                type="checkbox"
                {...register("featured")}
                className="mt-0.5 accent-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Feature this property
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Featured properties appear at the top of search results and on
                  the homepage.
                </p>
              </div>
            </label>
          </div>
        </div>
      </FormSection>
    </div>
  )
}
