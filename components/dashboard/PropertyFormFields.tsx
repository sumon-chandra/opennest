"use client"

import { useFormContext, Controller } from "react-hook-form"
import { motion } from "framer-motion"
import {
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
  ImageIcon,
  Loader2,
  Search,
} from "lucide-react"
import { AMENITIES, LOCATIONS } from "@/lib/constants"
import { type PropertyFormValues } from "@/lib/property-schema"
import { ImageUploader } from "./ImageUploader"
import { MultiImageUploader } from "./MultiImageUploader"
import { RichTextEditor } from "./RichTextEditor"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/app/dashboard/landlord/_actions/get-categories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

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

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
const labelClass = "mb-1.5 block text-sm font-medium text-foreground"
const errorClass = "mt-1 text-xs text-destructive"

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  delay?: number
}

function FormSection({ title, icon, children, delay = 0 }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2.5 border-b border-border/50 pb-3">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PropertyFormValues>()

  const selectedAmenities = watch("amenities") ?? []
  const images = watch("images") ?? []
  const thumbnail = watch("thumbnail")

  const [locationSearch, setLocationSearch] = useState("")
  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase()),
  )

  // Fetch categories for the dropdown
  const { data: categoriesResult, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 60, // 1 hour
  })
  const categories = categoriesResult?.data ?? []

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
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
      {/* ── Left Column (Main Content & Media) ── */}
      <div className="space-y-6 lg:col-span-2">
        {/* Basic Info */}
        <FormSection
          title="Basic Information"
          icon={<FileText size={16} />}
          delay={0}
        >
          <div className="space-y-5">
            {/* Title */}
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

            {/* Rich Text Description */}
            <div>
              <label className={labelClass}>
                Description <span className="text-destructive">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Write a detailed property description — highlights, neighborhood, nearby attractions, house rules…"
                    error={errors.description?.message as string | undefined}
                  />
                )}
              />
              {errors.description && (
                <p className={errorClass}>{errors.description.message}</p>
              )}
            </div>
          </div>
        </FormSection>

        {/* Media */}
        <FormSection title="Media" icon={<ImageIcon size={16} />} delay={0.2}>
          <div className="space-y-6">
            {/* Thumbnail */}
            <div>
              <label className={labelClass}>
                Cover / Thumbnail Image{" "}
                <span className="text-destructive">*</span>
              </label>
              <p className="mb-3 text-xs text-muted-foreground">
                This is the main image shown in property listings. Auto-cropped to
                16:9.
              </p>
              <Controller
                name="thumbnail"
                control={control}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={(file) => {
                      field.onChange(file)
                    }}
                    label="Cover Image"
                  />
                )}
              />
              {errors.thumbnail && (
                <p className={errorClass}>{errors.thumbnail.message as string}</p>
              )}
            </div>

            {/* Gallery Images */}
            <div>
              <label className={labelClass}>Gallery Images</label>
              <p className="mb-3 text-xs text-muted-foreground">
                Add up to 8 photos showcasing rooms, views, and amenities.
              </p>
              <MultiImageUploader
                values={images}
                onChange={(newImages) =>
                  setValue("images", newImages, { shouldDirty: true })
                }
                maxFiles={8}
              />
              {errors.images && (
                <p className={errorClass}>{errors.images.message as string}</p>
              )}
            </div>
          </div>
        </FormSection>
      </div>

      {/* ── Right Column (Metadata, Location, Specs) ── */}
      <div className="space-y-6">
        {/* Location, Price & Category */}
        <FormSection
          title="Listing Details"
          icon={<MapPin size={16} />}
          delay={0.05}
        >
          <div className="space-y-4">
            {/* Location (Searchable Select) */}
            <div>
              <label className={labelClass}>
                Location <span className="text-destructive">*</span>
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val: string | null) =>
                      val && field.onChange(val)
                    }
                  >
                    <SelectTrigger
                      id="location"
                      className="h-auto w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                    >
                      <SelectValue placeholder="Search or select city…">
                        {(val) => val || "Search or select city…"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <div className="sticky top-0 z-10 bg-popover px-2 pb-2 pt-2">
                        <div className="relative">
                          <Search
                            size={14}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="Type to search..."
                            className="w-full rounded-md border border-border bg-background py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
                            value={locationSearch}
                            onChange={(e) => setLocationSearch(e.target.value)}
                            onKeyDown={(e) => e.stopPropagation()} // Prevent select from closing on space
                          />
                        </div>
                      </div>
                      {filteredLocations.length === 0 ? (
                        <div className="py-4 text-center text-xs text-muted-foreground">
                          No locations found
                        </div>
                      ) : (
                        filteredLocations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <p className={errorClass}>{errors.location.message}</p>
              )}
            </div>

            {/* Fixed Price */}
            <div>
              <label htmlFor="price" className={labelClass}>
                Fixed Price ($) <span className="text-destructive">*</span>
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
                  step={1}
                  {...register("price", { valueAsNumber: true })}
                  placeholder="e.g. 1500"
                  className={`${inputClass} pl-9`}
                />
              </div>
              {errors.price && (
                <p className={errorClass}>{errors.price.message}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className={labelClass}>
                Category <span className="text-destructive">*</span>
              </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val: string | null) =>
                      val && field.onChange(val)
                    }
                    disabled={isCategoriesLoading}
                  >
                    <SelectTrigger
                      id="categoryId"
                      className="h-auto w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm"
                    >
                      {isCategoriesLoading ? (
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <Loader2 size={14} className="animate-spin" />
                          Loading…
                        </span>
                      ) : (
                        <SelectValue placeholder="Select a category…">
                          {(val) => {
                            if (!val) return "Select a category…";
                            const selectedCat = categories.find((c) => c.id === val);
                            return selectedCat ? (
                              <span className="flex items-center gap-1.5">
                                {selectedCat.icon && <span>{selectedCat.icon}</span>}
                                {selectedCat.name}
                              </span>
                            ) : (
                              "Select a category…"
                            );
                          }}
                        </SelectValue>
                      )}
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length === 0 && !isCategoriesLoading && (
                        <SelectItem value="_none" disabled>
                          No categories found
                        </SelectItem>
                      )}
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon && (
                            <span className="mr-1.5">{cat.icon}</span>
                          )}
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className={errorClass}>{errors.categoryId.message}</p>
              )}
            </div>
          </div>
        </FormSection>

        {/* Property Specs */}
        <FormSection
          title="Property Specs"
          icon={<BedDouble size={16} />}
          delay={0.1}
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedrooms" className={labelClass}>
                Bedrooms <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <BedDouble
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="bedrooms"
                  type="number"
                  min={0}
                  {...register("bedrooms", { valueAsNumber: true })}
                  placeholder="3"
                  className={`${inputClass} pl-8`}
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
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="bathrooms"
                  type="number"
                  min={0}
                  step={0.5}
                  {...register("bathrooms", { valueAsNumber: true })}
                  placeholder="2"
                  className={`${inputClass} pl-8`}
                />
              </div>
              {errors.bathrooms && (
                <p className={errorClass}>{errors.bathrooms.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <label htmlFor="area" className={labelClass}>
                Area (sqft)
              </label>
              <div className="relative">
                <Ruler
                  size={14}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  id="area"
                  type="number"
                  min={0}
                  {...register("area", { valueAsNumber: true })}
                  placeholder="e.g. 1200"
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
          </div>
        </FormSection>

        {/* Amenities */}
        <FormSection
          title="Amenities"
          icon={<CheckSquare size={16} />}
          delay={0.15}
        >
          <div className="grid grid-cols-2 gap-2.5">
            {AMENITIES.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity.id)
              return (
                <button
                  key={amenity.id}
                  type="button"
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  <span className="shrink-0">
                    {amenityIconMap[amenity.icon] ?? <CheckSquare size={12} />}
                  </span>
                  <span className="truncate font-medium">{amenity.name}</span>
                </button>
              )
            })}
          </div>
        </FormSection>

        {/* Visibility */}
        <FormSection title="Visibility" icon={<Tag size={16} />} delay={0.25}>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-4 py-3.5 transition-all hover:border-primary/40">
            <input
              type="checkbox"
              {...register("featured")}
              className="mt-0.5 accent-primary"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                Featured Listing
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                Featured properties appear prominently at the top of search
                results and on the homepage.
              </p>
            </div>
          </label>
        </FormSection>
      </div>
    </div>
  )
}
