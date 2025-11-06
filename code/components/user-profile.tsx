"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface UserProfileProps {
  userData: {
    name: string
    displayName: string
    id: number
    created: string
    description?: string
    avatarUrl: string
  }
  onConfirm: () => void
  onCancel: () => void
}

export function UserProfile({ userData, onConfirm, onCancel }: UserProfileProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-2xl p-8 relative z-10 border-2 border-primary/30 bg-card/95 backdrop-blur">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-primary">Perfil</span> Encontrado
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </div>

        {/* Avatar e informações principais */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-primary/30 rounded-3xl blur-xl" />
            <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-4 border-primary shadow-2xl shadow-primary/50">
              <Image
                src={userData.avatarUrl || "/placeholder.svg"}
                alt={userData.name}
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-balance">{userData.displayName}</h2>
          <p className="text-xl text-muted-foreground mb-1">@{userData.name}</p>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6 bg-muted/50 border-2 border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-muted-foreground">User ID</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{userData.id}</p>
          </Card>

          <Card className="p-6 bg-muted/50 border-2 border-border hover:border-primary/50 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Conta Criada</span>
            </div>
            <p className="text-lg font-bold text-foreground leading-tight">{formatDate(userData.created)}</p>
          </Card>
        </div>

        {/* Descrição (se existir) */}
        {userData.description && (
          <Card className="p-6 bg-muted/50 border-2 border-border mb-8">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Descrição</h3>
            <p className="text-foreground leading-relaxed">{userData.description}</p>
          </Card>
        )}

        {/* Botões de Confirmar e Cancelar */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={onCancel}
            className="h-12 text-lg font-bold bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg shadow-destructive/30 transition-all hover:shadow-xl hover:shadow-destructive/40"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className="h-12 text-lg font-bold bg-[#22c55e] hover:bg-[#22c55e]/90 text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:shadow-[#22c55e]/40"
          >
            Confirmar
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span>Dados fornecidos pela API oficial do Roblox</span>
        </div>
      </Card>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground relative z-10">
        <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
        <span>By Soneca</span>
      </div>
    </div>
  )
}
