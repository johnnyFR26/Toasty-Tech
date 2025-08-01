"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch (err) {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {/* Logo SVG da Toasty Tech */}
            <svg width="60" height="60" viewBox="0 0 100 100" className="text-purple-600">
              <defs>
                <linearGradient id="toasterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                fill="url(#toasterGradient)"
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
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            Toasty Tech
          </CardTitle>
          <CardDescription>Faça login para acessar o dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@toastytech.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Credenciais de teste:</p>
            <p>Email: admin@toastytech.com</p>
            <p>Senha: toasty123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
