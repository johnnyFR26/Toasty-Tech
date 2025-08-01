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
import { NewCompanyDialog } from "@/components/new-company-dialog"
import { NewProjectDialog } from "@/components/new-project-dialog"
import { Building2, FolderKanban, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react"

export default function DashboardPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCompanyName = (companyId: string) => {
    return mockCompanies.find((c) => c.id === companyId)?.name || "Empresa não encontrada"
  }

  const getProjectProgress = (status: string) => {
    switch (status) {
      case "planning":
        return 10
      case "development":
        return 50
      case "testing":
        return 80
      case "deployed":
        return 100
      case "maintenance":
        return 100
      case "paused":
        return 30
      case "cancelled":
        return 0
      default:
        return 0
    }
  }

  // Projetos em andamento
  const projectsInProgress = mockProjects.filter((p) => ["development", "testing", "planning"].includes(p.status))

  // Receita por categoria
  const revenueByCategory = Object.keys(categoryLabels)
    .map((category) => {
      const categoryProjects = mockProjects.filter((p) => p.category === category)
      const revenue = categoryProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
      const costs = categoryProjects.reduce((sum, p) => sum + p.serverCost, 0)

      return {
        category,
        label: categoryLabels[category as keyof typeof categoryLabels],
        revenue,
        profit: revenue - costs,
        projects: categoryProjects.length,
      }
    })
    .filter((cat) => cat.projects > 0)
    .sort((a, b) => b.revenue - a.revenue)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da Toasty Tech</p>
        </div>
        <div className="flex gap-2">
          <NewCompanyDialog />
          <NewProjectDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Empresas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground">Clientes ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDashboardStats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">de {mockDashboardStats.totalProjects} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockDashboardStats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Custos: {formatCurrency(mockDashboardStats.totalCosts)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockDashboardStats.totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              Margem: {((mockDashboardStats.totalProfit / mockDashboardStats.totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Projetos em Andamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Projetos em Andamento
            </CardTitle>
            <CardDescription>{projectsInProgress.length} projetos em desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectsInProgress.slice(0, 5).map((project) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{project.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {getCompanyName(project.companyId)}
                      </p>
                    </div>
                    <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                      {statusLabels[project.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={getProjectProgress(project.status)} className="flex-1 h-2" />
                    <span className="text-xs text-muted-foreground w-10">{getProjectProgress(project.status)}%</span>
                  </div>
                </div>
              ))}

              {projectsInProgress.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum projeto em andamento</p>
                  <p className="text-xs">Todos os projetos estão concluídos!</p>
                </div>
              )}

              {projectsInProgress.length > 5 && (
                <p className="text-xs text-muted-foreground text-center pt-2">
                  +{projectsInProgress.length - 5} projetos adicionais
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Receita por Categoria */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Receita por Categoria
            </CardTitle>
            <CardDescription>Distribuição da receita por tipo de projeto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueByCategory.map((category) => (
                <div key={category.category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{category.label}</Badge>
                    <span className="text-xs text-muted-foreground">
                      ({category.projects} projeto{category.projects !== 1 ? "s" : ""})
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{formatCurrency(category.revenue)}</p>
                    <p className="text-xs text-muted-foreground">Lucro: {formatCurrency(category.profit)}</p>
                  </div>
                </div>
              ))}

              {revenueByCategory.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FolderKanban className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhum projeto cadastrado</p>
                  <NewProjectDialog
                    trigger={
                      <button className="text-xs text-purple-600 hover:underline mt-2">Criar primeiro projeto</button>
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista Completa de Projetos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Todos os Projetos
          </CardTitle>
          <CardDescription>Lista completa com informações financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {project.status === "deployed" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {["development", "testing"].includes(project.status) && (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    {project.status === "planning" && <Clock className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Building2 className="h-3 w-3" />
                      {getCompanyName(project.companyId)}
                      <Badge variant="outline" className="text-xs">
                        {categoryLabels[project.category]}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{formatCurrency(project.monthlyRevenue)}</p>
                  <p className="text-sm text-purple-600">
                    Lucro: {formatCurrency(project.monthlyRevenue - project.serverCost)}
                  </p>
                </div>
              </div>
            ))}

            {mockProjects.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FolderKanban className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Nenhum projeto cadastrado</h3>
                <p className="mb-4">Comece criando seu primeiro projeto</p>
                <NewProjectDialog />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
