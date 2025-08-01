"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  mockDashboardStats,
  mockProjects,
  mockCompanies,
  statusLabels,
  statusColors,
  categoryLabels,
} from "@/lib/mock-data"
import { Building2, FolderKanban, DollarSign, TrendingUp, Clock, BarChart3 } from "lucide-react"

export default function DashboardPage() {
  const stats = mockDashboardStats
  const activeProjects = mockProjects.filter(
    (p) => p.isActive && ["development", "testing", "planning"].includes(p.status),
  )

  const revenueByCategory = mockProjects.reduce(
    (acc, project) => {
      const category = project.category
      if (!acc[category]) {
        acc[category] = { revenue: 0, count: 0 }
      }
      acc[category].revenue += project.monthlyRevenue
      acc[category].count += 1
      return acc
    },
    {} as Record<string, { revenue: number; count: number }>,
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos projetos e faturamento da Toasty Tech</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground">Clientes ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">de {stats.totalProjects} projetos totais</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Receita bruta mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              Margem: {((stats.totalProfit / stats.totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Projetos em Andamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Projetos em Andamento
            </CardTitle>
            <CardDescription>Projetos atualmente em desenvolvimento ou teste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeProjects.slice(0, 5).map((project) => {
                const company = mockCompanies.find((c) => c.id === project.companyId)
                const progress =
                  project.status === "planning"
                    ? 10
                    : project.status === "development"
                      ? 60
                      : project.status === "testing"
                        ? 85
                        : 100

                return (
                  <div key={project.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-muted-foreground">{company?.name}</p>
                      </div>
                      <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Receita por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Receita por Categoria
            </CardTitle>
            <CardDescription>Distribuição da receita mensal por tipo de projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(revenueByCategory)
                .sort(([, a], [, b]) => b.revenue - a.revenue)
                .map(([category, data]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                      <span className="font-medium">{categoryLabels[category as keyof typeof categoryLabels]}</span>
                      <Badge variant="secondary">{data.count}</Badge>
                    </div>
                    <span className="font-bold">{formatCurrency(data.revenue)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Todos os Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Todos os Projetos
          </CardTitle>
          <CardDescription>Lista completa de projetos com informações financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => {
              const company = mockCompanies.find((c) => c.id === project.companyId)
              const profit = project.monthlyRevenue - project.serverCost
              const margin = (profit / project.monthlyRevenue) * 100

              return (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                      <Badge variant="outline">{categoryLabels[project.category]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{company?.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium">Receita</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(project.monthlyRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Custo</p>
                        <p className="text-lg font-bold text-red-600">{formatCurrency(project.serverCost)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lucro</p>
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(profit)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Margem: {margin.toFixed(1)}%</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
