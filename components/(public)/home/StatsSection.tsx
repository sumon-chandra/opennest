"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"
import { Building2, Users, MapPin, Star } from "lucide-react"

const stats = [
  {
    icon: Building2,
    value: 500,
    suffix: "+",
    label: "Properties Listed",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Tenants",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: MapPin,
    value: 50,
    suffix: "+",
    label: "Cities Covered",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Star,
    value: 4.8,
    suffix: "/5",
    label: "Average Rating",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    isDecimal: true,
  },
]

function AnimatedCounter({
  value,
  suffix,
  isDecimal,
}: {
  value: number
  suffix: string
  isDecimal?: boolean
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    if (isDecimal) return latest.toFixed(1)
    if (latest >= 1000) return Math.round(latest / 1000) + "K"
    return Math.round(latest).toString()
  })
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
    })
    return controls.stop
  }, [count, value])

  return (
    <span className="text-4xl font-extrabold text-foreground sm:text-5xl">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-chart-2/5 blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Trusted by Thousands
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our numbers speak for themselves. Join a growing community of happy
            renters and landlords.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                isDecimal={stat.isDecimal}
              />
              <span className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
