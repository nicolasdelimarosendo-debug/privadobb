"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface UsernameInputProps {
  onSubmit: (username: string) => void
  onLogout: () => void
}

export function UsernameInput({ onSubmit, onLogout }: UsernameInputProps) {
  const [username, setUsername] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      onSubmit(username.trim())
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 border-2 border-primary/30 bg-card/95 backdrop-blur">
        <div className="flex justify-end mb-4">
          <Button
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="text-xs border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Sair
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#22c55e] rounded-2xl mb-4 shadow-lg shadow-[#22c55e]/50">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.75-8 9.92-4.87-1.17-8-5.4-8-9.92V8.18l8-4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-balance">
            <span className="text-[#22c55e]">Robux</span> Generator
          </h1>
          <p className="text-muted-foreground text-lg">{"Gerador De Robux Privado"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-foreground">
              Username do Roblox
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Digite o username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-12 text-lg bg-input border-2 border-border focus:border-primary transition-colors"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-[#22c55e] hover:bg-[#22c55e]/90 text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:shadow-[#22c55e]/40"
          >
            Buscar Perfil
          </Button>
        </form>

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
