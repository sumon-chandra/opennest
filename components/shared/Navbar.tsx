"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, LogOut, User } from "lucide-react"
import { motion } from "framer-motion"
import { NAVIGATION_LINKS } from "@/lib/constants"
import { User as UserType } from "@/types/user"
import Image from "next/image"

interface NavbarProps {
  user: UserType
  logout: () => void
}

export function Navbar({ user, logout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const router = useRouter()

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleListProperty = () => {
    if (user) {
      console.log("User is logged in. ", { user })
      // In a real app, navigate to property listing form
      // router.push("/properties/create")
    } else {
      console.log("User is not logged in")
      router.push("/auth/login")
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    setShowProfileMenu(false)
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              ON
            </div>
            <span className="hidden text-lg font-bold sm:inline">
              Open Nest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link href="/properties">
              <button className="rounded-lg border border-border px-4 py-2 transition-colors hover:border-foreground/50">
                Browse
              </button>
            </Link>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <div className="h-6 w-6 overflow-hidden rounded-full">
                    <Image
                      src={user.avatar || "/avatars/1.png"}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-border bg-card py-2 shadow-lg"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <User size={18} />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-secondary"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={handleListProperty}
                className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get Start
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="rounded-lg p-2 transition-colors hover:bg-secondary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-4 pb-4 md:hidden"
          >
            {NAVIGATION_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={link.href}
                  className="block rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-4 space-y-2 border-t border-border px-4 pt-2">
              <Link href="/properties">
                <button className="w-full rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-foreground/50">
                  Browse
                </button>
              </Link>
              {user ? (
                <>
                  <Link href="/profile">
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-opacity hover:opacity-90">
                      <User size={18} />
                      My Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleListProperty}
                  className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  List Property
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
