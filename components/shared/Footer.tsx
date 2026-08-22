"use client"

import Link from "next/link"
import { Share2, Share, Bookmark, Share as ShareIcon, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { FOOTER_LINKS } from "@/lib/constants"

export function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
                ON
              </div>
              <span className="font-bold">OpenNest</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and rent premium properties worldwide with confidence.
            </p>
            <div className="mt-4 flex gap-3">
              <button
                className="rounded-lg p-2 transition-colors hover:bg-secondary"
                title="Follow us"
              >
                <Share2 size={18} />
              </button>
              <button
                className="rounded-lg p-2 transition-colors hover:bg-secondary"
                title="Twitter"
              >
                <Share size={18} />
              </button>
              <button
                className="rounded-lg p-2 transition-colors hover:bg-secondary"
                title="Instagram"
              >
                <Bookmark size={18} />
              </button>
              <button
                className="rounded-lg p-2 transition-colors hover:bg-secondary"
                title="LinkedIn"
              >
                <ShareIcon size={18} />
              </button>
            </div>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links], idx) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="mb-4 font-semibold">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="my-8 border-t border-border py-8"
        >
          <div className="max-w-md">
            <h3 className="mb-2 font-semibold">Subscribe to our newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Get the best properties and travel tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between border-t border-border pt-8 text-sm text-muted-foreground md:flex-row"
        >
          <p>&copy; 2024 OpenNest. All rights reserved.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms & Conditions
            </Link>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
