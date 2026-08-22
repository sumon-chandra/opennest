import { getCategories } from "@/app/(public)/_actions/get-categories"
import { CategoriesClient } from "./_components/CategoriesClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categories - OpenNest",
  description:
    "Browse property categories on OpenNest. Find apartments, houses, villas, and more.",
}

export default async function CategoriesPage() {
  const { data: categories } = await getCategories()

  return <CategoriesClient categories={categories ?? []} />
}
