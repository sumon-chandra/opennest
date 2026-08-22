"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react"
import { FAQ_ITEMS } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/20"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-muted/30"
      >
        <span className="pr-2 font-semibold text-foreground">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="border-t border-border px-5 pb-5 pt-4">
              <p className="leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  const [search, setSearch] = useState("")
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const filteredFAQs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-4/5 py-16 sm:py-20">
        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-chart-4/8 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-chart-4/10 px-4 py-1.5 text-sm font-medium text-chart-4">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Find answers to the most common questions about using OpenNest,
              booking properties, and managing your account.
            </p>

            {/* Search */}
            <div className="mx-auto max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setOpenIndex(null)
                  }}
                  placeholder="Search questions..."
                  className="rounded-xl pl-10"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {filteredFAQs.length > 0 ? (
            <div className="space-y-3">
              {filteredFAQs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center py-16 text-center"
            >
              <HelpCircle className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No results found
              </h3>
              <p className="text-sm text-muted-foreground">
                Try different keywords or contact our support team.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <MessageSquare className="mx-auto mb-4 h-10 w-10 text-primary" />
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Still Have Questions?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Can&apos;t find what you&apos;re looking for? Our support team is
              always happy to help you with any questions.
            </p>
            <Link href="/contact">
              <Button className="group gap-2 rounded-xl px-6">
                Contact Support
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
