"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GroupNotJoinedProps {
  onGroupClick: () => void
  onCancel: () => void
}

export function GroupNotJoined({ onGroupClick, onCancel }: GroupNotJoinedProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 border-2 border-destructive/30 bg-card/95 backdrop-blur">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-destructive/20 rounded-2xl mb-4">
            <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-balance">Você Não Está no Grupo</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Para continuar e receber seus Robux, você precisa entrar no nosso grupo oficial.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onGroupClick}
            className="w-full h-14 text-lg font-bold bg-[#22c55e] hover:bg-[#22c55e]/90 text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:shadow-[#22c55e]/40 hover:scale-105"
          >
            Grupo Aqui
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-12 text-lg font-bold border-2 hover:bg-muted bg-transparent"
          >
            Cancelar
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
