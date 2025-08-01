"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockCompanies, mockProjects, statusLabels, statusColors } from "@/lib/mock-data"
import { NewCompanyDialog } from "@/components/new-company-dialog"
import { Building2, Mail, Phone, Globe, FolderKanban, DollarSign, TrendingUp, Search } from "lucide-react"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCompanyStats = (companyId: string) => {
    const projects = mockProjects.filter((p) => p.companyId === companyId)
    const totalRevenue = projects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
    const totalCosts = projects.reduce((sum, p) => sum + p.serverCost, 0)
    const totalProfit = totalRevenue - totalCosts
    const activeProjects = projects.filter((p) => p.isActive).length

    return {
      totalProjects: projects.length,
      activeProjects,
      totalRevenue,
      totalCosts,
      totalProfit,
      projects,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie as empresas clientes da Toasty Tech</p>
        </div>
        <NewCompanyDialog />
      </div>

      {/* Barra de Pesquisa */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar empresas por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de Empresas */}
      <div className="grid gap-6">
        {filteredCompanies.map((company) => {
          const stats = getCompanyStats(company.id)
          const isActive = stats.activeProjects > 0

          return (
            <Card key={company.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-cyan-100 dark:from-purple-900 dark:to-cyan-900 rounded-lg">
                      <Building2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{company.name}</CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {company.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {company.phone}
                        </span>
                        {company.website && (
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            <a
                              href={company.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              Website
                            </a>
                          </span>
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Ativo" : "Inativo"}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                {/* Estatísticas da Empresa */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <FolderKanban className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                    <p className="text-2xl font-bold">{stats.totalProjects}</p>
                    <p className="text-xs text-muted-foreground">Projetos</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-600" />
                    <p className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                    <p className="text-xs text-muted-foreground">Receita</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                    <p className="text-2xl font-bold">{formatCurrency(stats.totalProfit)}</p>
                    <p className="text-xs text-muted-foreground">Lucro</p>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="h-5 w-5 mx-auto mb-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                    <p className="text-2xl font-bold">{stats.activeProjects}</p>
                    <p className="text-xs text-muted-foreground">Ativos</p>
                  </div>
                </div>

                {/* Projetos da Empresa */}
                {stats.projects.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <FolderKanban className="h-4 w-4" />
                      Projetos ({stats.projects.length})
                    </h4>
                    <div className="space-y-2">
                      {stats.projects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{project.name}</span>
                              <Badge className={statusColors[project.status]}>{statusLabels[project.status]}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">{formatCurrency(project.monthlyRevenue)}</p>
                            <p className="text-xs text-muted-foreground">
                              Lucro: {formatCurrency(project.monthlyRevenue - project.serverCost)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stats.projects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FolderKanban className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Nenhum projeto encontrado para esta empresa</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Tente ajustar os termos de busca" : "Comece adicionando sua primeira empresa"}
            </p>
            <NewCompanyDialog />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
