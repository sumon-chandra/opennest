"use client"

import { useRouter } from "next/navigation"
import { useForm, FormProvider, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { PropertyFormFields } from "@/components/dashboard/PropertyFormFields"
import { updateProperty } from "@/app/dashboard/landlord/_actions/update-property"
import { Property } from "@/types/property"
import {
  propertySchema,
  type PropertyFormValues,
} from "@/lib/property-schema"

interface EditPropertyFormProps {
  property: Property
}

export function EditPropertyForm({ property }: EditPropertyFormProps) {
  const router = useRouter()

  const methods = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as never,
    defaultValues: {
      title: property.title,
      description: property.description,
      location: property.location,
      price: property.price,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area ?? null,
      thumbnail: property.thumbnail,
      images: property.images?.map((url) => ({ url })) ?? [],
      amenities: property.amenities ?? [],
      status: property.status,
      categoryId: property.categoryId,
      featured: property.featured ?? false,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods

  const onSubmit: SubmitHandler<PropertyFormValues> = async (values) => {
    const result = await updateProperty(property.id, {
      ...values,
      images: values.images.map((i) => i.url),
      amenities: values.amenities,
      featured: values.featured,
      area: values.area,
    })

    if (result.success) {
      toast.success("Property updated successfully!")
      router.push("/dashboard/landlord/properties")
    } else {
      toast.error(
        result.message || "Failed to update property. Please try again.",
      )
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Link
          href="/dashboard/landlord/properties"
          className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Edit Property
          </h1>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {property.title}
          </p>
        </div>
      </motion.div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <PropertyFormFields />

          {/* Submit Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-6 py-4"
          >
            <p className="text-sm text-muted-foreground">
              {isDirty ? (
                <span className="font-medium text-amber-600 dark:text-amber-400">
                  ● Unsaved changes
                </span>
              ) : (
                "No unsaved changes"
              )}
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/landlord/properties"
                className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </form>
      </FormProvider>
    </div>
  )
}
