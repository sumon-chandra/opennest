"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@opennest.com",
    description: "We'll respond within 24 hours",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am to 6pm EST",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    value: "123 OpenNest Ave",
    description: "New York, NY 10001",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri, 9am - 6pm",
    description: "Weekend support via email",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent! We'll get back to you soon.")
    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-chart-5/5 py-16 sm:py-20">
        <div className="absolute -right-40 top-0 h-[400px] w-[400px] rounded-full bg-chart-5/8 blur-[120px]" />
        <div className="absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/8 blur-[100px]" />

        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-chart-5/10 px-4 py-1.5 text-sm font-medium text-chart-5">
              <MessageSquare className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Have a question, suggestion, or need help? We&apos;re here to
              assist you. Reach out to us anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <h2 className="mb-2 text-2xl font-bold text-foreground">
                Let&apos;s Talk
              </h2>
              <p className="mb-8 text-muted-foreground">
                Choose the most convenient way to reach us. We&apos;re always
                happy to help.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm"
                  >
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${info.bgColor}`}
                    >
                      <info.icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground/80">
                        {info.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Full Name</Label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email Address</Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input
                      id="contact-subject"
                      name="subject"
                      placeholder="How can we help?"
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2 rounded-xl py-5 text-base sm:w-auto sm:px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map / Decorative Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              We&apos;re Here for You
            </h2>
            <p className="mx-auto max-w-xl text-muted-foreground">
              Whether you&apos;re a tenant looking for the perfect home or a
              landlord wanting to list your property, our team is ready to help
              you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
