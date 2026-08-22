"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Grid3X3, Home } from "lucide-react"
import { Category } from "@/types/category"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface CategoriesClientProps {
  categories: Category[]
}

export function CategoriesClient({ categories }: CategoriesClientProps) {
  const [search, setSearch] = useState("")

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-2/5 py-16 sm:py-20">
        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-chart-2/8 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-chart-2/10 px-4 py-1.5 text-sm font-medium text-chart-2">
              <Grid3X3 className="h-4 w-4" />
              Property Categories
            </div>
            <h1 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              Browse by Category
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Explore our diverse range of property types to find the perfect
              match for your lifestyle and budget.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search categories..."
                  className="rounded-xl pl-10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {filteredCategories.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/properties?category=${category.id}`}>
                  <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-muted">
                      {category.image ? (
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-chart-2/10 to-chart-5/15">
                          <Home className="h-16 w-16 text-primary/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Overlay content */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5">
                      {category.description ? (
                        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      ) : (
                        <p className="mb-4 text-sm text-muted-foreground">
                          Browse {category.name.toLowerCase()} properties
                          available for rent.
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                        Explore Properties
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <Grid3X3 className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              No categories found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search term.
            </p>
          </motion.div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Browse all properties or contact us for personalized
              recommendations.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/properties">
                <Button className="gap-2 rounded-xl px-6">
                  Browse All Properties
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="rounded-xl px-6">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
