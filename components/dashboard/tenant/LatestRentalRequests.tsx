"use client"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { LatestTenantRentalRequest } from "@/types/user"

interface LatestRentalRequestsProps {
  latestRentalRequests: LatestTenantRentalRequest[]
}

export const LatestRentalRequests = ({
  latestRentalRequests,
}: LatestRentalRequestsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="mb-4 text-2xl font-bold text-foreground">
        Latest Rental Requests
      </h2>
      <div className="space-y-4">
        {latestRentalRequests.map((request, idx) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {request.property.title}
                </h3>
                <p className="mt-1 flex items-center gap-1 text-muted-foreground">
                  <MapPin size={16} /> {request.property.location}
                </p>
                <div className="mt-3 flex flex-col gap-4 text-sm md:flex-row">
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Date Applied:
                    </span>{" "}
                    {new Date(request.createdAt).toDateString()}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium text-foreground">Status:</span>{" "}
                    {request.status}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">
                  {request.payment?.status === "COMPLETED" ||
                  request.status === "APPROVED"
                    ? request.payment?.id
                    : request.payment?.id || "Pending Payment"}
                </p>
                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    request.payment?.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-600"
                      : "bg-yellow-500/20 text-yellow-600"
                  }`}
                >
                  Payment: {request.payment?.status || "PENDING"}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
