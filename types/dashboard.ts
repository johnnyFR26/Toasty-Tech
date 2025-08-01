export interface Company {
  id: string
  name: string
  email: string
  phone: string
  website?: string
  createdAt: Date
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  companyId: string
  monthlyRevenue: number
  serverCost: number
  startDate: Date
  endDate?: Date
  isActive: boolean
}

export type ProjectCategory =
  | "landing-page"
  | "crm"
  | "dashboard"
  | "mobile-app"
  | "e-commerce"
  | "blog"
  | "portfolio"
  | "other"

export type ProjectStatus = "planning" | "development" | "testing" | "deployed" | "maintenance" | "paused" | "cancelled"

export interface DashboardStats {
  totalCompanies: number
  totalProjects: number
  activeProjects: number
  totalRevenue: number
  totalCosts: number
  totalProfit: number
}

export interface MonthlyReport {
  month: string
  revenue: number
  costs: number
  profit: number
  newProjects: number
  completedProjects: number
}
