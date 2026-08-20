import { motion } from "framer-motion"
import { BuildingIcon } from "lucide-react"

const PropertyNotFound = ({title, description}: {title: string, description?: string}) => {
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