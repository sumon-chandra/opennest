import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Bed, Bath, Square, Star, Heart, CheckCircle2, User, Mail, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProperty } from "../../_actions/get-property"

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

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link 
          href="/properties" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to properties
        </Link>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="relative h-100 md:h-125 w-full overflow-hidden rounded-2xl group">
          <Image
            src={property.thumbnail || "/placeholder-property.jpg"}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute top-4 right-4">
            <Button variant="secondary" size="icon" className="rounded-full bg-white/90 hover:bg-white text-rose-500">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-primary/90 text-primary-foreground hover:bg-primary">
                {property.status}
              </Badge>
              <Badge variant="secondary" className="bg-background/90 text-foreground">
                {property.category.name}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-200 text-sm md:text-base">
              <MapPin className="mr-2 h-4 w-4" />
              {property.location}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-card rounded-2xl border shadow-sm">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium">Bedrooms</span>
                </div>
                <span className="text-xl font-bold">{property.bedrooms}</span>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block"></div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Bath className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium">Bathrooms</span>
                </div>
                <span className="text-xl font-bold">{property.bathrooms}</span>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Square className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium">Area</span>
                </div>
                <span className="text-xl font-bold">{property.area || "--"} sqft</span>
              </div>
              <div className="w-px h-10 bg-border hidden sm:block"></div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center text-muted-foreground">
                  <Star className="h-5 w-5 mr-2 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium">Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold">{property.rating || "New"}</span>
                  <span className="text-xs text-muted-foreground">({property._count.reviews})</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">About this property</h2>
              <div 
                  className="rich-text-content text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: property.description }}
                />
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
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
                    <div key={index} className="relative h-48 md:h-64 rounded-xl overflow-hidden group cursor-pointer">
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
            <div className="p-6 bg-card rounded-2xl border shadow-sm sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">Rent price</p>
                <div className="flex items-end gap-1">
                  <h3 className="text-4xl font-bold text-primary">${property.price}</h3>
                  <span className="text-muted-foreground mb-1">/ month</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full text-lg h-12">Request to Rent</Button>
                <Button variant="outline" className="w-full text-lg h-12">Schedule a Tour</Button>
              </div>

              <div className="pt-6 border-t">
                <p className="text-sm font-medium mb-4">Listed by</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden relative">
                    {property.landlord?.avatar ? (
                      <Image src={property.landlord.avatar} alt={property.landlord.name} fill className="object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{property.landlord?.name || "Landlord"}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
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