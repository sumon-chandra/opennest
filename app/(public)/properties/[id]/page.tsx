import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Heart,
  CheckCircle2,
  User,
  Mail,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProperty } from "../../_actions/get-property"
import { RequestRentalModal } from "@/components/RequestRentalModal"

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const propertyResponse = await getProperty(id)

  if (!propertyResponse || !propertyResponse.data) {
    notFound()
  }

  const property = propertyResponse.data
  const description = property.description.replace(/&nbsp;/g, " ")

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/properties"
          className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to properties
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto mb-8 px-4">
        <div className="group relative h-100 w-full overflow-hidden rounded-2xl md:h-125">
          <Image
            src={property.thumbnail || "/placeholder-property.jpg"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/90 text-rose-500 hover:bg-white"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
                {property.status}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-background/90 text-foreground"
              >
                {property.category.name}
              </Badge>
            </div>
            <h1 className="mb-2 text-3xl leading-tight font-bold text-white md:text-5xl">
              {property.title}
            </h1>
            <div className="flex items-center text-sm text-gray-200 md:text-base">
              <MapPin className="mr-2 h-4 w-4" />
              {property.location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Bed className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Bedrooms</span>
                </div>
                <span className="text-xl font-bold">{property.bedrooms}</span>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Bath className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Bathrooms</span>
                </div>
                <span className="text-xl font-bold">{property.bathrooms}</span>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Square className="mr-2 h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Area</span>
                </div>
                <span className="text-xl font-bold">
                  {property.area || "--"} sqft
                </span>
              </div>
              <div className="hidden h-10 w-px bg-border sm:block"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Star className="mr-2 h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">{property.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({property._count.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About this property</h2>
              <div
                className="prose max-w-none min-w-0 text-muted-foreground prose-slate dark:prose-invert prose-headings:text-foreground prose-a:text-primary prose-img:h-auto prose-img:max-w-full"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Amenities</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {property.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg bg-secondary/50 p-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {property.images && property.images.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.images.map((image, index) => (
                    <div
                      key={index}
                      className="group relative h-48 cursor-pointer overflow-hidden rounded-xl md:h-64"
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-6">
                <p className="mb-1 text-sm text-muted-foreground">Rent price</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-4xl font-bold text-primary">
                    ${property.price}
                  </h3>
                  <span className="mb-1 text-muted-foreground">/ month</span>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <RequestRentalModal propertyId={property.id} />
                <Button variant="outline" className="h-12 w-full text-lg">
                  Schedule a Tour
                </Button>
              </div>

              <div className="border-t pt-6">
                <p className="mb-4 text-sm font-medium">Listed by</p>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-secondary">
                    {property.landlord?.avatar ? (
                      <Image
                        src={property.landlord.avatar}
                        alt={property.landlord.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {property.landlord?.name || "Landlord"}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {property.landlord?.email || "Contact via form"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
