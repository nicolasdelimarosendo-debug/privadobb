"use client"

import { useState, useEffect } from "react"
import { KeyLogin } from "@/components/key-login"
import { AdminPanel } from "@/components/admin-panel"
import { UsernameInput } from "@/components/username-input"
import { LoadingScreen } from "@/components/loading-screen"
import { UserProfile } from "@/components/user-profile"
import { RobuxSelector } from "@/components/robux-selector"
import { GroupNotJoined } from "@/components/group-not-joined"
import { GroupInstructions } from "@/components/group-instructions"
import { KeyStorageProvider } from "@/storage/KeyStorage" // ✅ novo import

type Stage =
  | "key-login"
  | "admin-panel"
  | "input"
  | "loading"
  | "profile"
  | "robux-selection"
  | "verifying-group"
  | "group-not-joined"
  | "preparing-group"
  | "group-instructions"

export default function Home() {
  const [stage, setStage] = useState<Stage>("key-login")
  const [userData, setUserData] = useState<any>(null)
  const [selectedRobux, setSelectedRobux] = useState<number | null>(null)
  const [currentKey, setCurrentKey] = useState<string>("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem("userKey")
    const savedIsAdmin = localStorage.getItem("isAdmin") === "true"

    if (savedKey) {
      setCurrentKey(savedKey)
      if (savedIsAdmin) {
        setIsAdmin(true)
        setStage("admin-panel")
      } else {
        setStage("input")
      }
    }
  }, [])

  const handleKeyLogin = (key: string, admin: boolean) => {
    setCurrentKey(key)
    setIsAdmin(admin)
    localStorage.setItem("userKey", key)
    localStorage.setItem("isAdmin", admin.toString())

    if (admin) {
      setStage("admin-panel")
    } else {
      setStage("input")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userKey")
    localStorage.removeItem("isAdmin")
    setCurrentKey("")
    setIsAdmin(false)
    setStage("key-login")
    setUserData(null)
    setSelectedRobux(null)
  }

  const handleUsernameSubmit = async (username: string) => {
    setStage("loading")

    try {
      const response = await fetch(`/api/roblox-user?username=${encodeURIComponent(username)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao buscar usuário")
      }

      const data = await response.json()
      setUserData(data)

      await fetch("/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: currentKey,
          username: username,
          action: "profile_viewed",
        }),
      })

      setTimeout(() => {
        setStage("profile")
      }, 2000)
    } catch (error) {
      console.error("[v0] Erro ao buscar usuário:", error)
      alert(error instanceof Error ? error.message : "Erro ao buscar usuário. Tente novamente.")
      setStage("input")
    }
  }

  const handleConfirmProfile = () => {
    setStage("robux-selection")
  }

  const handleCancel = () => {
    setStage("input")
    setUserData(null)
    setSelectedRobux(null)
  }

  const handleRobuxSelect = async (amount: number) => {
    setSelectedRobux(amount)
    setStage("verifying-group")

    await fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: currentKey,
        username: userData?.username,
        action: "robux_selected",
        amount: amount,
      }),
    })

    setTimeout(() => {
      setStage("group-not-joined")
    }, 3000)
  }

  const handleGroupClick = () => {
    setStage("preparing-group")

    setTimeout(() => {
      setStage("group-instructions")
    }, 2500)
  }

  return (
    <KeyStorageProvider> {/* ✅ provider adicionado */}
      <main className="min-h-screen">
        {stage === "key-login" && <KeyLogin onLogin={handleKeyLogin} />}
        {stage === "admin-panel" && <AdminPanel onLogout={handleLogout} />}
        {stage === "input" && <UsernameInput onSubmit={handleUsernameSubmit} onLogout={handleLogout} />}
        {stage === "loading" && <LoadingScreen message="Carregando perfil..." />}
        {stage === "profile" && userData && (
          <UserProfile userData={userData} onConfirm={handleConfirmProfile} onCancel={handleCancel} />
        )}
        {stage === "robux-selection" && <RobuxSelector onSelect={handleRobuxSelect} onCancel={handleCancel} />}
        {stage === "verifying-group" && <LoadingScreen message="Verificando se usuário está no grupo..." />}
        {stage === "group-not-joined" && <GroupNotJoined onGroupClick={handleGroupClick} onCancel={handleCancel} />}
        {stage === "preparing-group" && <LoadingScreen message="Preparando grupo..." />}
        {stage === "group-instructions" && <GroupInstructions onCancel={handleCancel} />}
      </main>
    </KeyStorageProvider>
  )
}
