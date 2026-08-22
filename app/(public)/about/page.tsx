"use client"

import { motion } from "framer-motion"
import {
  Shield,
  Sparkles,
  Users,
  Globe,
  Target,
  Heart,
  Building2,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import type { Metadata } from "next"

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description:
      "Every property is verified and every transaction is secure. We prioritize your safety at every step.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Quality First",
    description:
      "We curate only the finest properties, ensuring every listing meets our high standards of quality and comfort.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We build meaningful connections between landlords and tenants, fostering a community built on respect.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Globe,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology to make finding and renting properties effortless and enjoyable.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
]

const milestones = [
  { year: "2020", title: "Founded", description: "OpenNest was born from a vision to simplify property rentals." },
  { year: "2021", title: "1,000 Users", description: "Reached our first thousand happy tenants and growing strong." },
  { year: "2022", title: "50+ Cities", description: "Expanded to over 50 cities across the country." },
  { year: "2023", title: "10K+ Community", description: "A thriving community of landlords and tenants." },
  { year: "2024", title: "AI-Powered Search", description: "Launched intelligent property matching technology." },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 sm:py-28">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-chart-2/8 blur-[100px]" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                About OpenNest
              </span>
              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Redefining the Way{" "}
                <span className="bg-gradient-to-r from-primary to-chart-5 bg-clip-text text-transparent">
                  You Rent
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                OpenNest is a premium property rental platform that connects
                tenants with verified landlords. We believe everyone deserves a
                place they can call home.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="mb-3 inline-block rounded-full bg-chart-5/10 px-3 py-1 text-sm font-medium text-chart-5">
                  Our Mission
                </span>
                <h2 className="mb-6 text-3xl font-bold text-foreground sm:text-4xl">
                  Making Quality Rentals Accessible to Everyone
                </h2>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  We started OpenNest because we saw how stressful and confusing
                  the rental process can be. Our mission is to create a
                  transparent, trustworthy, and efficient platform that puts
                  people first.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  From our verified property listings to our secure payment
                  system, every feature is designed to give you peace of mind
                  and a seamless rental experience.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Verified properties with detailed listings",
                    "Secure online payments via Stripe",
                    "24/7 customer support",
                    "Transparent pricing with no hidden fees",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: Building2,
                      value: "500+",
                      label: "Properties",
                      color: "bg-primary/10 text-primary",
                    },
                    {
                      icon: Users,
                      value: "10K+",
                      label: "Tenants",
                      color: "bg-chart-2/10 text-chart-2",
                    },
                    {
                      icon: MapPin,
                      value: "50+",
                      label: "Cities",
                      color: "bg-chart-5/10 text-chart-5",
                    },
                    {
                      icon: Star,
                      value: "4.8",
                      label: "Rating",
                      color: "bg-chart-4/10 text-chart-4",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
                    >
                      <div
                        className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
                      >
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <span className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {stat.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-chart-4/10 px-4 py-1 text-sm font-medium text-chart-4">
              Our Values
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              What We Stand For
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our values shape every decision we make and every feature we build.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${value.bgColor}`}
                >
                  <value.icon className={`h-6 w-6 ${value.color}`} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Our Journey
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              Milestones Along the Way
            </h2>
          </motion.div>

          <div className="relative mx-auto max-w-3xl">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border sm:left-1/2 sm:-translate-x-1/2" />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative flex items-start gap-6 pl-12 sm:pl-0 ${
                    index % 2 === 0
                      ? "sm:flex-row sm:text-right"
                      : "sm:flex-row-reverse sm:text-left"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background sm:left-1/2 sm:-translate-x-1/2" />

                  {/* Content */}
                  <div className="flex-1 rounded-xl border border-border bg-card p-4 shadow-sm sm:max-w-xs">
                    <span className="mb-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                  <div className="hidden flex-1 sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 py-20">
        <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="mx-auto mb-4 h-10 w-10 text-primary-foreground/80" />
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
              Join the OpenNest Community
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
              Whether you&apos;re a tenant looking for your dream home or a
              landlord with a property to share, we&apos;d love to welcome you.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="/properties"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 font-semibold text-primary shadow-lg transition-all hover:bg-white/90"
              >
                <Target className="h-5 w-5" />
                Browse Properties
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-white/10"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
