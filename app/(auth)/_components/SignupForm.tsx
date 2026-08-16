"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from "next/navigation"

import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoaderIcon } from "lucide-react"
import { createUser } from "@/services/users.service"
import { toast } from "@/components/ui/toast"
import { login } from "../_actions/auth-actions"


const formSchema = z.object({
  role: z.enum(["TENANT", "LANDLORD", "ADMIN"], {
    error: "Select user your role",
  }),
  name: z
    .string({ error: "Add your name" })
    .min(3, "Username must be at least 3 characters."),
  email: z
    .string({ error: "Add your email address" })
    .email({ message: "Invalid email" }),
  phone: z.string().nullish(),
  password: z
    .string({ error: "Please add your password" })
    .min(6, { error: "Password must be at least 6 characters" }),
})

export function SignupForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "TENANT",
      name: "",
      email: "",
      phone: null,
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const newUser = await createUser({
        role: data.role,
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone ?? undefined,
      })

      if (newUser.success) {
        form.reset()
        // Handle redirect if provided
        if ("redirectUrl" in newUser && newUser.redirectUrl) {
          router.push(newUser.redirectUrl)
        }
      } else {
        toast.add({ title: newUser.message })
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to create your account right now."

      console.error("Failed to create user:", message)
    }
  }

  const isLoading = form.formState.isSubmitting

  return (
    <div>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => {
              const isInvalid = fieldState.invalid
              return (
                <FieldSet data-invalid={isInvalid}>
                  <FieldLegend variant="label">Choose your role</FieldLegend>
                  <RadioGroup
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={isInvalid}
                  >
                    <FieldLabel htmlFor="tenant">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Tenant</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="TENANT" id="tenant" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="landlord">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Landlord</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="LANDLORD" id="landlord" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="admin">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Admin</FieldTitle>
                        </FieldContent>
                        <RadioGroupItem value="ADMIN" id="admin" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                  {isInvalid && <FieldError errors={[fieldState.error]} />}
                </FieldSet>
              )
            }}
          />
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Enter your name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Deo"
                  autoComplete="off"
                  className="border-white/10 bg-background/50 shadow-inner transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Enter your email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="john@deo.com"
                  autoComplete="off"
                  className="border-white/10 bg-background/50 shadow-inner transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="phone">Enter you phone number</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="phone"
                  aria-invalid={fieldState.invalid}
                  placeholder="01712345678"
                  autoComplete="off"
                  className="border-white/10 bg-background/50 shadow-inner transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Enter you password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                  autoComplete="off"
                  className="border-white/10 bg-background/50 shadow-inner transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Field className="mt-6">
          <Button 
            type="submit" 
            className="w-full cursor-pointer bg-gradient-to-r from-primary to-primary/80 py-6 text-lg shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98]" 
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
        </Field>
      </form>
      {/* Terms and Privacy */}
      <p className="text-center text-xs text-muted-foreground mt-4">
        By signing up, you agree to our{" "}
        <Link href="/(static)/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/(static)/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>

      {/* Sign In Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  )
}
