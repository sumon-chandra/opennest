export interface AdminStatistics {
  users: AdminUserStats
  properties: AdminPropertyStats
  financials: AdminFinancialStats
  rentalRequests: AdminRentalRequestStats
  engagement: AdminEngagementStats
}

export interface AdminUserStats {
  total: number
  byRole: { role: string; count: number }[]
  byStatus: { status: string; count: number }[]
}

export interface AdminPropertyStats {
  total: number
  byStatus: { status: string; count: number }[]
}

export interface AdminFinancialStats {
  totalRevenue: number
  byStatus: { status: string; count: number }[]
}

export interface AdminRentalRequestStats {
  total: number
  byStatus: { status: string; count: number }[]
}

export interface AdminEngagementStats {
  totalReviews: number
}

export interface AdminReview {
  id: string
  content: string
  rating: number
  user: {
    name: string
    email: string
    avatar?: string | null
  }
  property: {
    id: string
    title: string
  }
  createdAt: string
}
