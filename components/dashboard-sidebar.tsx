"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Building2, FolderOpen, BarChart3, Settings, LogOut, User } from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Empresas",
    url: "/dashboard/companies",
    icon: Building2,
  },
  {
    title: "Projetos",
    url: "/dashboard/projects",
    icon: FolderOpen,
  },
  {
    title: "Relatórios",
    url: "/dashboard/reports",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-2">
          {/* Logo SVG da Toasty Tech */}
          <svg width="32" height="32" viewBox="0 0 100 100" className="text-purple-600">
            <defs>
              <linearGradient id="toasterGradientSidebar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            {/* Torradeira */}
            <rect
              x="25"
              y="30"
              width="50"
              height="35"
              rx="5"
              fill="url(#toasterGradientSidebar)"
              stroke="#4C1D95"
              strokeWidth="2"
            />
            <rect x="30" y="35" width="15" height="25" rx="2" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1" />
            <rect x="55" y="35" width="15" height="25" rx="2" fill="#F3F4F6" stroke="#6B7280" strokeWidth="1" />

            {/* Vapor/Calor */}
            <path d="M35 25 Q37 20 35 15" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M50 25 Q52 20 50 15" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M65 25 Q67 20 65 15" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Painel de controle */}
            <circle cx="40" cy="75" r="3" fill="#10B981" />
            <circle cx="50" cy="75" r="3" fill="#EF4444" />
            <circle cx="60" cy="75" r="3" fill="#3B82F6" />

            {/* Circuitos tech */}
            <path
              d="M15 15 L25 25 M75 25 L85 15 M15 85 L25 75 M75 75 L85 85"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="15" cy="15" r="2" fill="#06B6D4" />
            <circle cx="85" cy="15" r="2" fill="#06B6D4" />
            <circle cx="15" cy="85" r="2" fill="#06B6D4" />
            <circle cx="85" cy="85" r="2" fill="#06B6D4" />
          </svg>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Toasty Tech
            </h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-600">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
