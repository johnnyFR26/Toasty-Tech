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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutDashboard, Building2, FolderKanban, BarChart3, Settings, LogOut, ChevronUp, User2 } from "lucide-react"

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
    icon: FolderKanban,
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
      <SidebarHeader>
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
            <rect x="25" y="35" width="50" height="35" rx="5" fill="url(#toasterGradientSidebar)" />
            <rect x="30" y="40" width="8" height="20" rx="2" fill="white" opacity="0.3" />
            <rect x="42" y="40" width="8" height="20" rx="2" fill="white" opacity="0.3" />
            <rect x="54" y="40" width="8" height="20" rx="2" fill="white" opacity="0.3" />

            {/* Painel de controle */}
            <circle cx="70" cy="50" r="3" fill="#10B981" />
            <circle cx="70" cy="58" r="2" fill="#F59E0B" />

            {/* Vapor/Calor */}
            <path d="M35 30 Q37 25 35 20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M45 32 Q47 27 45 22" stroke="#06B6D4" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M55 30 Q57 25 55 20" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Circuitos Tech */}
            <circle cx="15" cy="15" r="2" fill="#06B6D4" />
            <circle cx="85" cy="15" r="2" fill="#8B5CF6" />
            <circle cx="15" cy="85" r="2" fill="#8B5CF6" />
            <circle cx="85" cy="85" r="2" fill="#06B6D4" />

            <path d="M15 15 L25 25" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
            <path d="M85 15 L75 25" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
            <path d="M15 85 L25 75" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
            <path d="M85 85 L75 75" stroke="#06B6D4" strokeWidth="1" opacity="0.4" />
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 className="h-4 w-4" />
                  <span>{user?.name}</span>
                  <ChevronUp className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <User2 className="h-4 w-4 mr-2" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
