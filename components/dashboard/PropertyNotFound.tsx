import { motion } from "framer-motion"
import { BuildingIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const PropertyNotFound = ({title, description, loading}: {title: string, description?: string, loading?: boolean}) => {
    if (loading) {
        return (
            <div className="w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-12 text-center">
                <Skeleton className="h-8 w-8 rounded-full mb-2" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
            </div>
        )
    }

    return (
      <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-12 text-center"
          >
            <BuildingIcon className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-base text-foreground">{title}</p>
            {description && <p className="mt-2 text-muted-foreground text-sm">{description}</p>}
          </motion.div>
    )
}

export default PropertyNotFound