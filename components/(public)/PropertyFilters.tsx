"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"
import { ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Common amenities list
const AMENITIES = [
  "WiFi",
  "Air Conditioning",
  "Parking",
  "Pet-friendly",
  "Kitchen",
  "Gym",
  "Pool",
  "Laundry",
]

// Common locations (can be fetched from backend)
const LOCATIONS = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
]

// Sort options
const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating: High to Low" },
  { value: "newest", label: "Newest First" },
]

export function PropertyFilters({
  onFilterApply,
}: {
  onFilterApply?: () => void
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Extract current filter values from URL
  const [location, setLocation] = useState<string[]>(
    searchParams.get("location")?.split(",").filter(Boolean) || []
  )
  const [featured, setFeatured] = useState(
    searchParams.get("featured") === "true"
  )
  const [amenities, setAmenities] = useState<string[]>(
    searchParams.get("amenities")?.split(",").filter(Boolean) || []
  )
  const [minPrice, setMinPrice] = useState([
    parseInt(searchParams.get("minPrice") || "0"),
  ])
  const [maxPrice, setMaxPrice] = useState([
    parseInt(searchParams.get("maxPrice") || "10000"),
  ])
  const [minRating, setMinRating] = useState([
    parseFloat(searchParams.get("minRating") || "0"),
  ])
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "relevance"
  )

  // Track which sections are open
  const [openSections, setOpenSections] = useState({
    location: true,
    featured: true,
    amenities: true,
    rating: true,
    price: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Update URL with filters
  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()

    if (location.length > 0) params.set("location", location.join(","))
    if (featured) params.set("featured", "true")
    if (amenities.length > 0) params.set("amenities", amenities.join(","))
    if (minPrice[0] > 0) params.set("minPrice", minPrice[0].toString())
    if (maxPrice[0] < 10000) params.set("maxPrice", maxPrice[0].toString())
    if (minRating[0] > 0) params.set("minRating", minRating[0].toString())
    if (sortBy !== "relevance") params.set("sortBy", sortBy)

    const queryString = params.toString()
    router.push(`/properties${queryString ? `?${queryString}` : ""}`)

    // Close sidebar on mobile after applying filters
    onFilterApply?.()
  }, [
    location,
    featured,
    amenities,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    router,
    onFilterApply,
  ])

  const clearFilters = useCallback(() => {
    setLocation([])
    setFeatured(false)
    setAmenities([])
    setMinPrice([0])
    setMaxPrice([10000])
    setMinRating([0])
    setSortBy("relevance")
    router.push("/properties")
  }, [router])

  const toggleLocation = (loc: string) => {
    setLocation((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    )
  }

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <div className="space-y-4">
      {/* Clear Filters Button */}
      {(location.length > 0 ||
        featured ||
        amenities.length > 0 ||
        minPrice[0] > 0 ||
        maxPrice[0] < 10000 ||
        minRating[0] > 0 ||
        sortBy !== "relevance") && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
          className="w-full"
        >
          <X className="mr-2 h-4 w-4" />
          Clear Filters
        </Button>
      )}

      {/* Location Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("location")}
          className="flex w-full items-center justify-between rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
        >
          <span className="text-sm font-semibold">Location</span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: openSections.location
                ? "rotate(0deg)"
                : "rotate(-90deg)",
            }}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2 pl-2">
            {LOCATIONS.map((loc) => (
              <div key={loc} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${loc}`}
                  checked={location.includes(loc)}
                  onCheckedChange={() => toggleLocation(loc)}
                />
                <Label
                  htmlFor={`location-${loc}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {loc}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("featured")}
          className="flex w-full items-center justify-between rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
        >
          <span className="text-sm font-semibold">Special</span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: openSections.featured
                ? "rotate(0deg)"
                : "rotate(-90deg)",
            }}
          />
        </button>
        {openSections.featured && (
          <div className="space-y-2 pl-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setFeatured(checked as boolean)}
              />
              <Label
                htmlFor="featured"
                className="cursor-pointer text-sm font-normal"
              >
                Featured Properties Only
              </Label>
            </div>
          </div>
        )}
      </div>

      {/* Amenities Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("amenities")}
          className="flex w-full items-center justify-between rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
        >
          <span className="text-sm font-semibold">Amenities</span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: openSections.amenities
                ? "rotate(0deg)"
                : "rotate(-90deg)",
            }}
          />
        </button>
        {openSections.amenities && (
          <div className="space-y-2 pl-2">
            {AMENITIES.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={amenities.includes(amenity)}
                  onCheckedChange={() => toggleAmenity(amenity)}
                />
                <Label
                  htmlFor={`amenity-${amenity}`}
                  className="cursor-pointer text-sm font-normal"
                >
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("rating")}
          className="flex w-full items-center justify-between rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
        >
          <span className="text-sm font-semibold">Minimum Rating</span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: openSections.rating
                ? "rotate(0deg)"
                : "rotate(-90deg)",
            }}
          />
        </button>
        {openSections.rating && (
          <div className="space-y-3 pl-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {minRating[0].toFixed(1)} ⭐
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={minRating[0]}
              onChange={(e) => setMinRating([parseFloat(e.target.value)])}
              className="w-full cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="space-y-3">
        <button
          onClick={() => toggleSection("price")}
          className="flex w-full items-center justify-between rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80"
        >
          <span className="text-sm font-semibold">Price Range</span>
          <ChevronDown
            className="h-4 w-4 transition-transform"
            style={{
              transform: openSections.price ? "rotate(0deg)" : "rotate(-90deg)",
            }}
          />
        </button>
        {openSections.price && (
          <div className="space-y-3 pl-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="min-price" className="text-muted-foreground">
                  Min: ${minPrice[0]}
                </label>
              </div>
              <input
                id="min-price"
                type="range"
                min="0"
                max={Math.max(minPrice[0] + 100, maxPrice[0] - 100)}
                step="100"
                value={minPrice[0]}
                onChange={(e) => setMinPrice([parseInt(e.target.value)])}
                className="w-full cursor-pointer"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <label htmlFor="max-price" className="text-muted-foreground">
                  Max: ${maxPrice[0]}
                </label>
              </div>
              <input
                id="max-price"
                type="range"
                min={Math.min(minPrice[0] + 100, maxPrice[0] - 100)}
                max="10000"
                step="100"
                value={maxPrice[0]}
                onChange={(e) => setMaxPrice([parseInt(e.target.value)])}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Apply Filters Button */}
      <Button onClick={applyFilters} className="w-full">
        Apply Filters
      </Button>
    </div>
  )
}
