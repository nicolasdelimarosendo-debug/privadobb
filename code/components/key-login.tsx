"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabaseClient"

interface KeyLoginProps {
  onLogin: (key: string, isAdmin: boolean) => void
}

export function KeyLogin({ onLogin }: KeyLoginProps) {
  const [key, setKey] = useState("")
  const [showAdminInput, setShowAdminInput] = useState(false)
  const [adminKey, setAdminKey] = useState("")
  const [error, setError] = useState("")

  const handleKeySubmit = async () => {
    if (!key.trim()) {
      setError("Por favor, insira uma key")
      return
    }

    try {
      // Busca a key no Supabase
      const { data, error: fetchErr } = await supabase
        .from("keys")
        .select("*")
        .eq("key", key.trim())
        .single()

      if (fetchErr || !data) {
        setError("Key inválida")
        return
      }

      if (data.used) {
        setError("Key já utilizada")
        return
      }

      // Marca como usada
      const { error: updateErr } = await supabase
        .from("keys")
        .update({ used: true, used_at: new Date().toISOString() })
        .eq("key", key.trim())

      if (updateErr) {
        console.error("Erro ao marcar key como usada:", updateErr)
        setError("Erro ao validar key. Tente novamente.")
        return
      }

      // Sucesso
      onLogin(key.trim(), data.role === "admin")
    } catch (err) {
      console.error(err)
      setError("Erro ao validar key. Tente novamente.")
    }
  }

  const handleAdminSubmit = () => {
    // Removemos adminKey hardcoded por segurança. Admins devem usar accounts reais.
    setError("Entrada admin desabilitada aqui. Use seu usuário administrador.")
    setShowAdminInput(false)
    setAdminKey("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md p-8 relative z-10 border-2 border-primary/30 bg-card/95 backdrop-blur shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#22c55e] to-[#16a34a] rounded-3xl mb-6 shadow-lg shadow-[#22c55e]/50 animate-pulse">
            <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-[#22c55e]">Robux</span> Generator
          </h1>
          <p className="text-muted-foreground text-lg">Sistema de Autenticação</p>
        </div>

        {!showAdminInput ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Insira sua Key</label>
              <Input
                type="text"
                value={key}
                onChange={(e) => { setKey(e.target.value); setError("") }}
                placeholder="Digite sua key aqui..."
                className="h-12 text-lg border-2 focus:border-[#22c55e] bg-muted/50"
                onKeyDown={(e) => e.key === "Enter" && handleKeySubmit()}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border-2 border-destructive/50 rounded-lg">
                <p className="text-destructive text-sm font-medium text-center">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleKeySubmit} className="flex-1 h-12 text-lg font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:scale-105">
                Confirmar Key
              </Button>
              <Button onClick={() => setShowAdminInput(true)} variant="outline" className="h-12 px-6 text-lg font-bold border-2 border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e]/10">
                Admin
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">Key de Administrador</label>
              <Input type="password" value={adminKey} onChange={(e) => { setAdminKey(e.target.value); setError("") }} placeholder="Digite a key de admin..." className="h-12 text-lg border-2 focus:border-[#22c55e] bg-muted/50" />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border-2 border-destructive/50 rounded-lg">
                <p className="text-destructive text-sm font-medium text-center">{error}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleAdminSubmit} className="flex-1 h-12 text-lg font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-[#22c55e]/30">
                Entrar como Admin
              </Button>
              <Button onClick={() => { setShowAdminInput(false); setAdminKey(""); setError("") }} variant="outline" className="h-12 px-6 text-lg font-bold border-2">
                Voltar
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
          <span>Sistema Seguro de Keys</span>
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground relative z-10">
        <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
        <span>By Soneca</span>
      </div>
    </div>
  )
}
