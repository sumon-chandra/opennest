"use client"

import { motion } from "framer-motion"
import { Globe, Shield, Sparkles, Clock, Wallet, HeadphonesIcon } from "lucide-react"

const benefits = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Your data and transactions are protected with enterprise-grade encryption.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Every listing is carefully vetted to ensure the highest standards.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access properties in top cities worldwide from a single platform.",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Clock,
    title: "Fast Approvals",
    description: "Get your rental applications reviewed and approved in record time.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden fees. What you see is exactly what you pay.",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you whenever you need.",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
]

export function PlatformBenefits() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-chart-2/10 px-4 py-1 text-sm font-medium text-chart-2">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            The OpenNest Advantage
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Experience a new standard of property rental with our cutting-edge platform designed around your needs.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg sm:p-8"
            >
              <div
                className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${benefit.bgColor}`}
              >
                <benefit.icon className={`h-7 w-7 ${benefit.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
