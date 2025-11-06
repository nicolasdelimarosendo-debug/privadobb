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

  // === FUNÇÃO PARA PEGAR IP REAL (com múltiplos fallbacks) ===
  const getRealIP = async (): Promise<string> => {
    try {
      const res = await fetch("https://api64.ipify.org?format=json")
      const data = await res.json()
      return data.ip || "IP desconhecido"
    } catch {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()
        return data.ip || "IP desconhecido"
      } catch {
        return "IP bloqueado/firewall"
      }
    }
  }

  // === REGISTRAR LOG AO CARREGAR O PAINEL ===
  useEffect(() => {
    const registerVisit = async () => {
      const ip = await getRealIP()
      const now = new Date().toISOString()
      const userAgent = navigator.userAgent
      const page = window.location.pathname

      const newLog = {
        id: Date.now() + Math.random(),
        ip,
        userAgent,
        page,
        timestamp: now,
        dateBR: new Date().toLocaleString("pt-BR"),
      }

      // Carrega logs existentes
      const storedLogs = JSON.parse(localStorage.getItem("adminLogs") || "[]")
      const updatedLogs = [newLog, ...storedLogs]
      
      // Limita a 500 logs (evita ficar gigante)
      const limitedLogs = updatedLogs.slice(0, 500)

      localStorage.setItem("adminLogs", JSON.stringify(limitedLogs))
      setLogs(limitedLogs)
    }

    registerVisit()
  }, [])

  // === CARREGA KEYS E LOGS AO MONTAR ===
  useEffect(() => {
    const storedKeys = JSON.parse(localStorage.getItem("generatedKeys") || "[]")
    setKeys(storedKeys)

    const storedLogs = JSON.parse(localStorage.getItem("adminLogs") || "[]")
    setLogs(storedLogs)
  }, [])

  const generateKeys = async () => {
    const newKeys = Array.from({ length: newKeyCount }, () => ({
      key: crypto.randomUUID().replace(/-/g, ""),
      used: false,
      createdAt: new Date().toISOString(),
    }))
    const updatedKeys = [...keys, ...newKeys]
    setKeys(updatedKeys)
    setNewKeyCount(1)
    localStorage.setItem("generatedKeys", JSON.stringify(updatedKeys))

    const textContent = newKeys.map((k) => k.key).join("\n")
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

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    alert("Key copiada!")
  }

  const saveGroupLink = () => {
    alert("Link do grupo atualizado!")
  }

  // === LIMPAR LOGS ===
  const clearLogs = () => {
    if (confirm("Tem certeza que quer apagar TODOS os logs?")) {
      localStorage.removeItem("adminLogs")
      setLogs([])
    }
  }

  return (
    <div className="min-h-screen p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            Logs ({logs.length})
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

        {/* ABA GERAR KEYS */}
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

        {/* ABA LOGS - AGORA FUNCIONA 100% */}
        {activeTab === "logs" && (
          <Card className="p-6 border-2 border-primary/30 bg-card/95 backdrop-blur">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Logs de Acesso</h2>
              <Button
                onClick={clearLogs}
                variant="destructive"
                size="sm"
              >
                Limpar Tudo
              </Button>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-center text-muted-foreground py-10">
                  Nenhum log registrado ainda...
                </p>
              ) : (
                logs.map((log) => (
                  <Card key={log.id} className="p-4 bg-muted/50 border-2 border-orange-500/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-bold text-[#22c55e]">IP:</span>{" "}
                        <span className="font-mono break-all">{log.ip}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#22c55e]">Data/Hora:</span>{" "}
                        {log.dateBR}
                      </div>
                      <div>
                        <span className="font-bold text-[#22c55e]">Navegador:</span>{" "}
                        <span className="text-xs break-all">{log.userAgent}</span>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </Card>
        )}

        {/* ABA CONFIGURAÇÕES */}
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