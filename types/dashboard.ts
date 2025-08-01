export interface Company {
  id: string
  name: string
  email: string
  phone: string
  createdAt: Date
  projects: Project[]
}

export interface Project {
  id: string
  name: string
  description: string
  category: ProjectCategory
  status: "active" | "inactive"
  isInProgress: boolean
  companyId: string
  monthlyRevenue: number
  serverCost: number
  createdAt: Date
  updatedAt: Date
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

export interface User {
  id: string
  email: string
  name: string
}

export interface RevenueReport {
  month: string
  totalRevenue: number
  totalCosts: number
  profit: number
  activeProjects: number
}
