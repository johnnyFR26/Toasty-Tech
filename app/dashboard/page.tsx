"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockProjects, mockCompanies, mockRevenueReports, categoryLabels } from "@/lib/mock-data"
import { Building2, FolderOpen, DollarSign, Server, TrendingUp, Clock } from "lucide-react"

export default function DashboardPage() {
  const activeProjects = mockProjects.filter((p) => p.status === "active")
  const inProgressProjects = mockProjects.filter((p) => p.isInProgress)
  const totalRevenue = activeProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  const totalCosts = activeProjects.reduce((sum, p) => sum + p.serverCost, 0)
  const profit = totalRevenue - totalCosts
  const currentMonth = mockRevenueReports[mockRevenueReports.length - 1]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral dos projetos e faturamento da Toasty Tech</p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCompanies.length}</div>
            <p className="text-xs text-muted-foreground">Total de empresas cadastradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeProjects.length}</div>
            <p className="text-xs text-muted-foreground">{inProgressProjects.length} em andamento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Custos: R$ {totalCosts.toLocaleString("pt-BR")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Mensal</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {profit.toLocaleString("pt-BR")}</div>
            <p className="text-xs text-muted-foreground">Margem: {((profit / totalRevenue) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Projetos em Andamento */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Projetos em Andamento
            </CardTitle>
            <CardDescription>Projetos que estão sendo desenvolvidos atualmente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {inProgressProjects.map((project) => {
              const company = mockCompanies.find((c) => c.id === project.companyId)
              return (
                <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{company?.name}</p>
                    <Badge variant="secondary">{categoryLabels[project.category]}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">
                      R$ {project.monthlyRevenue.toLocaleString("pt-BR")}/mês
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Custo: R$ {project.serverCost.toLocaleString("pt-BR")}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Resumo Financeiro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Resumo Financeiro
            </CardTitle>
            <CardDescription>Análise de custos e receitas por categoria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(categoryLabels).map(([category, label]) => {
              const categoryProjects = activeProjects.filter((p) => p.category === category)
              if (categoryProjects.length === 0) return null

              const categoryRevenue = categoryProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
              const categoryCosts = categoryProjects.reduce((sum, p) => sum + p.serverCost, 0)
              const categoryProfit = categoryRevenue - categoryCosts
              const profitMargin = (categoryProfit / categoryRevenue) * 100

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{label}</span>
                    <span className="text-sm text-muted-foreground">
                      {categoryProjects.length} projeto{categoryProjects.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Receita: R$ {categoryRevenue.toLocaleString("pt-BR")}</span>
                    <span className="text-green-600">Lucro: {profitMargin.toFixed(1)}%</span>
                  </div>
                  <Progress value={profitMargin} className="h-2" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Projetos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Projetos</CardTitle>
          <CardDescription>Lista completa de projetos com status e informações financeiras</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProjects.map((project) => {
              const company = mockCompanies.find((c) => c.id === project.companyId)
              return (
                <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{project.name}</p>
                      <Badge variant={project.status === "active" ? "default" : "secondary"}>
                        {project.status === "active" ? "Ativo" : "Inativo"}
                      </Badge>
                      {project.isInProgress && <Badge variant="outline">Em Andamento</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{company?.name}</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <Badge variant="secondary">{categoryLabels[project.category]}</Badge>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-medium text-green-600">
                      R$ {project.monthlyRevenue.toLocaleString("pt-BR")}/mês
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Custo: R$ {project.serverCost.toLocaleString("pt-BR")}/mês
                    </p>
                    <p className="text-sm font-medium">
                      Lucro: R$ {(project.monthlyRevenue - project.serverCost).toLocaleString("pt-BR")}
                    </p>
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
