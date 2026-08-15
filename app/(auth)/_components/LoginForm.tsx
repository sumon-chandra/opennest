"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LoaderIcon } from "lucide-react"
import { login } from "../_actions/auth-actions"
import { toast } from "@/components/ui/toast"

const formSchema = z.object({
  email: z
    .string({ error: "Add your email address" })
    .email({ message: "Invalid email" }),
  password: z.string({ error: "Please add your password" }),
})

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit({ email, password }: z.infer<typeof formSchema>) {
    const loginResponse = await login({ email, password })
    if (!loginResponse.success) {
      toast.add({ title: loginResponse.message })
    }
    form.reset()
  }

  return (
    <div>
      <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
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
            {isLoading ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
        </Field>
      </form>

      {/* Sign up Link */}
      <p className="text-center text-sm text-muted-foreground mt-4">
        New here?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}
