"use client"

import { motion } from "framer-motion"
import { Search, Flag, Check, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock Data
const flaggedItems = [
  {
    id: "FLG-001",
    type: "Review",
    content: "This landlord is a total scammer! Stole my deposit and refused to answer calls.",
    reportedBy: "Bob Smith",
    target: "Alice Johnson (Landlord)",
    date: "2026-08-16",
    status: "Pending",
    severity: "High",
  },
  {
    id: "FLG-002",
    type: "Property",
    content: "Property description seems fake. The images are stock photos from a furniture catalog.",
    reportedBy: "Charlie Davis",
    target: "Luxury Penthouse Manhattan (Listing)",
    date: "2026-08-14",
    status: "Investigating",
    severity: "Medium",
  },
  {
    id: "FLG-003",
    type: "Message",
    content: "Spam message containing malicious links.",
    reportedBy: "Emily Chen",
    target: "User: CryptoKing99",
    date: "2026-08-10",
    status: "Resolved",
    severity: "Low",
  },
]

export default function AdminModeration() {
  return (
    <div className="space-y-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Content Moderation
          </h1>
          <p className="text-muted-foreground mt-2">
            Review flagged content and user reports.
          </p>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search reports..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {flaggedItems.map((item) => (
          <div key={item.id} className="rounded-xl border bg-card p-6 shadow-xs flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="font-mono text-xs">{item.id}</Badge>
                <Badge variant="secondary">{item.type}</Badge>
                <Badge 
                  variant={
                    item.severity === "High" ? "destructive" : 
                    item.severity === "Medium" ? "default" : "secondary"
                  }
                  className={item.severity === "Medium" ? "bg-amber-500 hover:bg-amber-600" : ""}
                >
                  {item.severity} Priority
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">{item.date}</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reported By</p>
                <p>{item.reportedBy}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target</p>
                <div className="flex items-center gap-2">
                  <p>{item.target}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-md border text-sm mt-2">
              <div className="flex items-center gap-2 mb-2 text-muted-foreground font-medium">
                <Flag className="h-4 w-4" /> Reported Content
              </div>
              <p className="italic">"{item.content}"</p>
            </div>
            
            <div className="flex items-center justify-between mt-2 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge variant={item.status === "Resolved" ? "default" : "outline"} className={item.status === "Resolved" ? "bg-green-500" : ""}>
                  {item.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Check className="h-4 w-4" /> Keep Content
                </Button>
                <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                  <Trash2 className="h-4 w-4" /> Remove Content
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
