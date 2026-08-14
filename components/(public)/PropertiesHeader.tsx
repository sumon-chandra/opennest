"use client"

interface PropertiesHeaderProps {
  title?: string
  subtitle?: string
  propertiesCount: number
}

export function PropertiesHeader({
  title = "Find Your Perfect Stay",
  subtitle = "premium properties",
  propertiesCount,
}: PropertiesHeaderProps) {
  return (
    <section className="bg-secondary/30 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="text-muted-foreground">
          Browse from {propertiesCount || 0} {subtitle}
        </p>
      </div>
    </section>
  )
}
