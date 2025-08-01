"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { mockCompanies, mockProjects, categoryLabels } from "@/lib/mock-data"
import { Building2, Mail, Phone, Plus, Search, FolderOpen } from "lucide-react"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCompanies = mockCompanies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getCompanyProjects = (companyId: string) => {
    return mockProjects.filter((project) => project.companyId === companyId)
  }

  const getCompanyStats = (companyId: string) => {
    const projects = getCompanyProjects(companyId)
    const activeProjects = projects.filter((p) => p.status === "active")
    const totalRevenue = activeProjects.reduce((sum, p) => sum + p.monthlyRevenue, 0)
    const totalCosts = activeProjects.reduce((sum, p) => sum + p.serverCost, 0)

    return {
      totalProjects: projects.length,
      activeProjects: activeProjects.length,
      totalRevenue,
      totalCosts,
      profit: totalRevenue - totalCosts,
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Empresas</h1>
          <p className="text-muted-foreground">Gerencie as empresas clientes da Toasty Tech</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      {/* Barra de pesquisa */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Lista de empresas */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => {
          const stats = getCompanyStats(company.id)
          const projects = getCompanyProjects(company.id)

          return (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {company.name}
                    </CardTitle>
                    <CardDescription>Cliente desde {company.createdAt.toLocaleDateString("pt-BR")}</CardDescription>
                  </div>
                  <Badge variant={stats.activeProjects > 0 ? "default" : "secondary"}>
                    {stats.activeProjects > 0 ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Informações de contato */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{company.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{company.phone}</span>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{stats.totalProjects}</p>
                    <p className="text-xs text-muted-foreground">Projetos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">R$ {stats.totalRevenue.toLocaleString("pt-BR")}</p>
                    <p className="text-xs text-muted-foreground">Receita/mês</p>
                  </div>
                </div>

                {/* Projetos */}
                {projects.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      <span className="text-sm font-medium">Projetos:</span>
                    </div>
                    <div className="space-y-1">
                      {projects.slice(0, 3).map((project) => (
                        <div key={project.id} className="flex items-center justify-between text-sm">
                          <span className="truncate">{project.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {categoryLabels[project.category]}
                            </Badge>
                            <Badge variant={project.status === "active" ? "default" : "secondary"} className="text-xs">
                              {project.status === "active" ? "Ativo" : "Inativo"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {projects.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{projects.length - 3} projeto{projects.length - 3 !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Lucro */}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Lucro mensal:</span>
                    <span className="text-sm font-bold text-green-600">R$ {stats.profit.toLocaleString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Custos: R$ {stats.totalCosts.toLocaleString("pt-BR")}</span>
                    <span>
                      Margem: {stats.totalRevenue > 0 ? ((stats.profit / stats.totalRevenue) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma empresa encontrada</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? "Tente ajustar os termos de busca." : "Comece adicionando sua primeira empresa cliente."}
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Empresa
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
