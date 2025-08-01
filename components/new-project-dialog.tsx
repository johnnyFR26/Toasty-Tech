"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { mockCompanies, categoryLabels, statusLabels } from "@/lib/mock-data"
import type { ProjectCategory, ProjectStatus } from "@/types/dashboard"
import { Plus, FolderKanban } from "lucide-react"

interface NewProjectDialogProps {
  trigger?: React.ReactNode
}

export function NewProjectDialog({ trigger }: NewProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "" as ProjectCategory | "",
    status: "planning" as ProjectStatus,
    companyId: "",
    monthlyRevenue: "",
    serverCost: "",
    startDate: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validações
      if (!formData.name || !formData.companyId || !formData.category) {
        throw new Error("Preencha todos os campos obrigatórios")
      }

      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Aqui você faria a chamada real para a API
      const projectData = {
        ...formData,
        monthlyRevenue: Number.parseFloat(formData.monthlyRevenue) || 0,
        serverCost: Number.parseFloat(formData.serverCost) || 0,
        startDate: new Date(formData.startDate),
        isActive: true,
      }

      console.log("Novo projeto:", projectData)

      toast({
        title: "Projeto cadastrado!",
        description: `${formData.name} foi adicionado com sucesso.`,
      })

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "" as ProjectCategory | "",
        status: "planning",
        companyId: "",
        monthlyRevenue: "",
        serverCost: "",
        startDate: "",
      })

      setOpen(false)
    } catch (error) {
      toast({
        title: "Erro ao cadastrar projeto",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Projeto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderKanban className="h-5 w-5" />
            Novo Projeto
          </DialogTitle>
          <DialogDescription>Cadastre um novo projeto para uma empresa cliente.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Projeto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ex: Landing Page Corporativa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva o projeto..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Empresa *</Label>
              <Select value={formData.companyId} onValueChange={(value) => handleInputChange("companyId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {mockCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(statusLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyRevenue">Receita Mensal (R$)</Label>
              <Input
                id="monthlyRevenue"
                type="number"
                step="0.01"
                min="0"
                value={formData.monthlyRevenue}
                onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serverCost">Custo do Servidor (R$)</Label>
              <Input
                id="serverCost"
                type="number"
                step="0.01"
                min="0"
                value={formData.serverCost}
                onChange={(e) => handleInputChange("serverCost", e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Cadastrando..." : "Cadastrar Projeto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
