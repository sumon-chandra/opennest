"use client"

import { motion } from "framer-motion"
import { Key, Home, ShieldCheck, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    title: "For Tenants",
    description:
      "Find your dream home effortlessly. Browse verified listings, request tours, and manage your rentals all in one secure place.",
    icon: Home,
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
    points: ["Verified Properties", "Secure Online Payments", "24/7 Support"],
    link: "/properties",
    linkText: "Find a Home",
  },
  {
    title: "For Landlords",
    description:
      "List your properties and find reliable tenants quickly. Manage applications, collect rent, and handle maintenance requests.",
    icon: Key,
    color: "from-chart-2/20 to-chart-2/5",
    iconColor: "text-chart-2",
    points: [
      "Background Checks",
      "Automated Rent Collection",
      "Property Analytics",
    ],
    link: "/signup",
    linkText: "List a Property",
  },
]

export function SystemFeatures() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            Platform Overview
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            A Complete Ecosystem for Rentals
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Whether you are looking for a place to stay or managing your real
            estate portfolio, OpenNest provides the tools you need for a
            seamless experience.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all hover:border-primary/20 hover:shadow-xl sm:p-10"
            >
              <div
                className={`absolute -top-20 -right-20 h-64 w-64 rounded-full bg-linear-to-br ${feature.color} blur-[80px] transition-all group-hover:scale-110`}
              />

              <div className="relative z-10">
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${feature.color} shadow-sm`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>

                <ul className="mb-8 space-y-3">
                  {feature.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                    >
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                        <ShieldCheck className="h-3 w-3 text-primary" />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>

                <Link href={feature.link}>
                  <Button
                    className="gap-2 rounded-xl"
                    variant={index === 0 ? "default" : "outline"}
                  >
                    {feature.linkText}
                    <Zap className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
