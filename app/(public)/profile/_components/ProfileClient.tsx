"use client"

import { useState, useRef, useTransition } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Camera,
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Loader2,
  Save,
  Calendar,
} from "lucide-react"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { updateProfile } from "@/app/(public)/profile/_actions/profile-actions"
import { toast } from "sonner"

interface ProfileClientProps {
  user: User
}

export function ProfileClient({ user }: ProfileClientProps) {
  const [name, setName] = useState(user.name || "")
  const [phone, setPhone] = useState(user.phone || "")
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type & size
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB.")
      return
    }

    setAvatarFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("phone", phone)

      if (avatarFile) {
        formData.append("avatar", avatarFile)
      }
      if (user.avatar) {
        formData.append("currentAvatar", user.avatar)
      }

      const result = await updateProfile(formData)

      if (result.success) {
        toast.success("Profile updated successfully!")
        setAvatarFile(null)
        setAvatarPreview(null)
      } else {
        toast.error(result.message || "Failed to update profile.")
      }
    })
  }

  const displayAvatar = avatarPreview || user.avatar
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column — Avatar Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                {/* Cover gradient */}
                <div className="h-24 bg-gradient-to-br from-primary/80 via-primary/60 to-chart-2/50" />

                <div className="flex flex-col items-center px-6 pb-6">
                  {/* Avatar */}
                  <div className="relative -mt-14">
                    <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-card bg-muted shadow-lg">
                      {displayAvatar ? (
                        <Image
                          src={displayAvatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}

                      {/* Upload overlay */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100"
                      >
                        <Camera className="h-6 w-6 text-white" />
                      </button>
                    </div>

                    {/* Upload indicator dot */}
                    {avatarFile && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-1 -top-1 h-5 w-5 rounded-full border-2 border-card bg-chart-1"
                      />
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />

                  <h2 className="mt-3 text-lg font-semibold text-foreground">
                    {user.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="gap-1 rounded-full px-3 py-1 text-xs"
                    >
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </Badge>
                    <Badge
                      variant={
                        user.status === "ACTIVE" ? "default" : "destructive"
                      }
                      className="rounded-full px-3 py-1 text-xs"
                    >
                      {user.status}
                    </Badge>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {joinDate}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full gap-1.5 rounded-xl"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                    {user.avatar ? "Change Avatar" : "Upload Avatar"}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Profile Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
                <h3 className="mb-6 text-lg font-semibold text-foreground">
                  Personal Information
                </h3>

                <div className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="profile-name"
                      className="flex items-center gap-1.5 text-sm font-medium"
                    >
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      Full Name
                    </Label>
                    <Input
                      id="profile-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="rounded-xl"
                    />
                  </div>

                  {/* Email (read-only) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="profile-email"
                      className="flex items-center gap-1.5 text-sm font-medium"
                    >
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </Label>
                    <Input
                      id="profile-email"
                      value={user.email}
                      readOnly
                      disabled
                      className="rounded-xl bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">
                      Email cannot be changed
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="profile-phone"
                      className="flex items-center gap-1.5 text-sm font-medium"
                    >
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone Number
                    </Label>
                    <Input
                      id="profile-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      className="rounded-xl"
                    />
                  </div>

                  {/* Role (read-only) */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-sm font-medium">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      Account Role
                    </Label>
                    <Input
                      value={user.role}
                      readOnly
                      disabled
                      className="rounded-xl bg-muted/50"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="mt-8 flex items-center justify-end gap-3">
                  {avatarFile && (
                    <span className="text-sm text-muted-foreground">
                      New avatar selected
                    </span>
                  )}
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="gap-2 rounded-xl px-6"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
