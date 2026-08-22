"use client"

import { motion } from "framer-motion"
import { Search, FileCheck, Home } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description:
      "Browse hundreds of verified properties with detailed photos, amenities, and location info.",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: FileCheck,
    title: "Request & Book",
    description:
      "Submit a rental request with your preferred move-in date. Get fast approvals from verified landlords.",
    color: "from-chart-2/20 to-chart-2/5",
    iconColor: "text-chart-2",
  },
  {
    icon: Home,
    title: "Move In & Enjoy",
    description:
      "Complete your payment securely online and move into your new home with confidence.",
    color: "from-chart-5/20 to-chart-5/5",
    iconColor: "text-chart-5",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-chart-5/10 px-4 py-1 text-sm font-medium text-chart-5">
            Simple Process
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Finding and renting your ideal property has never been easier. Just
            three simple steps.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connector line */}
          <div className="absolute left-1/2 top-16 hidden h-0.5 w-2/3 -translate-x-1/2 bg-gradient-to-r from-primary/30 via-chart-2/30 to-chart-5/30 lg:block" />

          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number */}
                <div className="absolute -top-3 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-card text-sm font-bold text-foreground shadow-sm lg:right-8">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-sm`}
                >
                  <step.icon className={`h-9 w-9 ${step.iconColor}`} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
