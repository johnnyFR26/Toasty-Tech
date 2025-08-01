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
        setError("Credenciais inválidas. Tente novamente.")
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
              <rect x="25" y="35" width="50" height="35" rx="5" fill="url(#toasterGradient)" />
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
        </CardContent>
      </Card>
    </div>
  )
}
