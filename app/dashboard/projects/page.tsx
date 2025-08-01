"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { mockProjects, mockCompanies, categoryLabels, statusLabels, statusColors } from "@/lib/mock-data"
import { NewProjectDialog } from "@/components/new-project-dialog"
import type { ProjectCategory, ProjectStatus } from "@/types/dashboard"
import {
  FolderKanban,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  Building2,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  X,
} from "lucide-react"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all")
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | "all">("all")
  const [activeTab, setActiveTab] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCompanyName = (companyId: string) => {
    return mockCompanies.find((c) => c.id === companyId)?.name || "Empresa não encontrada"
  }

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "planning":
        return <Clock className="h-4 w-4" />
      case "development":
        return <AlertCircle className="h-4 w-4" />
      case "testing":
        return <AlertCircle className="h-4 w-4" />
      case "deployed":
        return <CheckCircle className="h-4 w-4" />
      case "maintenance":
        return <TrendingUp className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "cancelled":
        return <X className="h-4 w-4" />
      default:
        return <FolderKanban className="h-4 w-4" />
    }
  }

  const getProjectProgress = (status: ProjectStatus) => {
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

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCompanyName(project.companyId).toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && project.isActive) ||
      (activeTab === "in-progress" && ["development", "testing", "planning"].includes(project.status)) ||
      (activeTab === "completed" && project.status === "deployed")

    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  const projectStats = {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.isActive).length,
    inProgress: mockProjects.filter((p) => ["development", "testing", "planning"].includes(p.status)).length,
    completed: mockProjects.filter((p) => p.status === "deployed").length,
    totalRevenue: mockProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0),
    totalCosts: mockProjects.reduce((sum, p) => sum + p.serverCost, 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os projetos da Toasty Tech</p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
            <p className="text-xs text-muted-foreground">{projectStats.active} ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Desenvolvimento ativo</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(projectStats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Mensal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(projectStats.totalRevenue - projectStats.totalCosts)}
            </div>
            <p className="text-xs text-muted-foreground">
              Margem:{" "}
              {(((projectStats.totalRevenue - projectStats.totalCosts) / projectStats.totalRevenue) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value as ProjectCategory | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedStatus}
                onValueChange={(value) => setSelectedStatus(value as ProjectStatus | "all")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Todos ({projectStats.total})</TabsTrigger>
          <TabsTrigger value="active">Ativos ({projectStats.active})</TabsTrigger>
          <TabsTrigger value="in-progress">Em Andamento ({projectStats.inProgress})</TabsTrigger>
          <TabsTrigger value="completed">Concluídos ({projectStats.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Building2 className="h-3 w-3" />
                        {getCompanyName(project.companyId)}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{categoryLabels[project.category]}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  {/* Status and Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{getProjectProgress(project.status)}%</span>
                    </div>
                    <Progress value={getProjectProgress(project.status)} className="h-2" />
                  </div>

                  {/* Financial Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm font-medium text-green-600">{formatCurrency(project.monthlyRevenue)}</p>
                      <p className="text-xs text-muted-foreground">Receita</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-600">
                        {formatCurrency(project.monthlyRevenue - project.serverCost)}
                      </p>
                      <p className="text-xs text-muted-foreground">Lucro</p>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Início: {project.startDate.toLocaleDateString("pt-BR")}
                    </div>
                    {project.endDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Fim: {project.endDate.toLocaleDateString("pt-BR")}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <FolderKanban className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                    ? "Tente ajustar os filtros de busca"
                    : "Comece criando seu primeiro projeto"}
                </p>
                <NewProjectDialog />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
