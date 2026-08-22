"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 via-primary to-primary/80 py-24">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 h-[350px] w-[350px] rounded-full bg-white/5 blur-[80px]" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(to right, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Start Your Journey Today
            </span>
          </motion.div>

          <h2 className="mb-6 text-3xl font-extrabold text-primary-foreground sm:text-4xl lg:text-5xl">
            Ready to Find Your <br className="hidden sm:block" />
            Perfect Home?
          </h2>

          <p className="mb-10 text-lg text-primary-foreground/80">
            Join thousands of happy tenants who found their dream rental on
            OpenNest. Browse verified properties and move in with confidence.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/properties">
              <Button
                size="lg"
                variant="secondary"
                className="group gap-2 rounded-xl px-8 py-6 text-base font-semibold shadow-lg"
              >
                Browse Properties
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl border-white/30 px-8 py-6 text-base font-semibold text-primary-foreground hover:bg-white/10"
              >
                Create Free Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
