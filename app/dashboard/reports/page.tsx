"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockProjects, mockCompanies, mockMonthlyReports, categoryLabels } from "@/lib/mock-data"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart,
  Target,
  Building2,
  FolderKanban,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function ReportsPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  // Calcular estatísticas gerais
  const totalRevenue = mockProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  const totalCosts = mockProjects.reduce((sum, p) => sum + p.serverCost, 0)
  const totalProfit = totalRevenue - totalCosts
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

  // Estatísticas por categoria
  const categoryStats = Object.keys(categoryLabels)
    .map((category) => {
      const categoryProjects = mockProjects.filter((p) => p.category === category)
      const revenue = categoryProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
      const costs = categoryProjects.reduce((sum, p) => sum + p.serverCost, 0)
      const profit = revenue - costs

      return {
        category,
        label: categoryLabels[category as keyof typeof categoryLabels],
        projects: categoryProjects.length,
        revenue,
        costs,
        profit,
        margin: revenue > 0 ? (profit / revenue) * 100 : 0,
      }
    })
    .filter((stat) => stat.projects > 0)

  // Top empresas por receita
  const companyStats = mockCompanies
    .map((company) => {
      const companyProjects = mockProjects.filter((p) => p.companyId === company.id)
      const revenue = companyProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
      const costs = companyProjects.reduce((sum, p) => sum + p.serverCost, 0)

      return {
        ...company,
        projectCount: companyProjects.length,
        revenue,
        costs,
        profit: revenue - costs,
      }
    })
    .filter((company) => company.projectCount > 0)
    .sort((a, b) => b.revenue - a.revenue)

  // Projetos mais lucrativos
  const topProjects = [...mockProjects]
    .sort((a, b) => b.monthlyRevenue - b.serverCost - (a.monthlyRevenue - a.serverCost))
    .slice(0, 5)

  // Crescimento mensal
  const currentMonth = mockMonthlyReports[mockMonthlyReports.length - 1]
  const previousMonth = mockMonthlyReports[mockMonthlyReports.length - 2]
  const revenueGrowth = previousMonth
    ? ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100
    : 0
  const profitGrowth = previousMonth ? ((currentMonth.profit - previousMonth.profit) / previousMonth.profit) * 100 : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-muted-foreground">Análises financeiras e de desempenho da Toasty Tech</p>
      </div>

      {/* KPIs Principais */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {revenueGrowth >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(revenueGrowth).toFixed(1)}%
              </span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalProfit)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {profitGrowth >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={profitGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                {Math.abs(profitGrowth).toFixed(1)}%
              </span>
              <span className="ml-1">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Margem de Lucro</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profitMargin.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Custos: {formatCurrency(totalCosts)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projetos Ativos</CardTitle>
            <FolderKanban className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.filter((p) => p.isActive).length}</div>
            <p className="text-xs text-muted-foreground">de {mockProjects.length} total</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="companies">Por Empresa</TabsTrigger>
          <TabsTrigger value="projects">Top Projetos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Evolução Mensal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Evolução Mensal
              </CardTitle>
              <CardDescription>Receita, custos e lucro dos últimos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMonthlyReports.map((report, index) => (
                  <div key={report.month} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium w-24">{report.month}</div>
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-green-600 font-medium">{formatCurrency(report.revenue)}</p>
                          <p className="text-xs text-muted-foreground">Receita</p>
                        </div>
                        <div>
                          <p className="text-sm text-red-600 font-medium">{formatCurrency(report.costs)}</p>
                          <p className="text-xs text-muted-foreground">Custos</p>
                        </div>
                        <div>
                          <p className="text-sm text-purple-600 font-medium">{formatCurrency(report.profit)}</p>
                          <p className="text-xs text-muted-foreground">Lucro</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{report.newProjects} novos</p>
                      <p className="text-xs text-muted-foreground">{report.completedProjects} concluídos</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Análise por Categoria
              </CardTitle>
              <CardDescription>Desempenho financeiro por tipo de projeto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{stat.label}</Badge>
                        <span className="text-sm text-muted-foreground">({stat.projects} projetos)</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{formatCurrency(stat.profit)}</p>
                        <p className="text-xs text-muted-foreground">{stat.margin.toFixed(1)}% margem</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-green-600 font-medium">{formatCurrency(stat.revenue)}</p>
                        <p className="text-xs text-muted-foreground">Receita</p>
                      </div>
                      <div>
                        <p className="text-red-600 font-medium">{formatCurrency(stat.costs)}</p>
                        <p className="text-xs text-muted-foreground">Custos</p>
                      </div>
                      <div>
                        <Progress value={stat.margin} className="mt-1" />
                        <p className="text-xs text-muted-foreground mt-1">Margem</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Top Empresas por Receita
              </CardTitle>
              <CardDescription>Ranking das empresas que mais geram receita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companyStats.map((company, index) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900 dark:to-cyan-900 rounded-full">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-sm text-muted-foreground">{company.projectCount} projetos</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatCurrency(company.revenue)}</p>
                      <p className="text-sm text-purple-600">Lucro: {formatCurrency(company.profit)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderKanban className="h-5 w-5" />
                Projetos Mais Lucrativos
              </CardTitle>
              <CardDescription>Top 5 projetos com maior margem de lucro</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProjects.map((project, index) => {
                  const company = mockCompanies.find((c) => c.id === project.companyId)
                  const profit = project.monthlyRevenue - project.serverCost
                  const margin = (profit / project.monthlyRevenue) * 100

                  return (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900 dark:to-cyan-900 rounded-full">
                          <span className="text-sm font-bold text-purple-600 dark:text-purple-400">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{project.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {company?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{formatCurrency(profit)}</p>
                        <p className="text-sm text-muted-foreground">{margin.toFixed(1)}% margem</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
