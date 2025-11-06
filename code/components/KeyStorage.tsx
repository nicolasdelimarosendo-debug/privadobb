"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface Key {
  key: string
  used: boolean
  createdAt: string
}

interface KeyStorageContextType {
  keys: Key[]
  addKeys: (newKeys: Key[]) => void
  markKeyAsUsed: (key: string) => void
  clearKeys: () => void
}

const KeyStorageContext = createContext<KeyStorageContextType | undefined>(undefined)

export function KeyStorageProvider({ children }: { children: ReactNode }) {
  const [keys, setKeys] = useState<Key[]>([])

  // Carregar keys salvas ao abrir o site
  useEffect(() => {
    const stored = localStorage.getItem("generatedKeys")
    if (stored) setKeys(JSON.parse(stored))
  }, [])

  // Atualizar localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("generatedKeys", JSON.stringify(keys))
  }, [keys])

  const addKeys = (newKeys: Key[]) => setKeys((prev) => [...prev, ...newKeys])
  const markKeyAsUsed = (key: string) =>
    setKeys((prev) => prev.map((k) => (k.key === key ? { ...k, used: true } : k)))
  const clearKeys = () => setKeys([])

  return (
    <KeyStorageContext.Provider value={{ keys, addKeys, markKeyAsUsed, clearKeys }}>
      {children}
    </KeyStorageContext.Provider>
  )
}

export function useKeyStorage() {
  const context = useContext(KeyStorageContext)
  if (!context) throw new Error("useKeyStorage deve ser usado dentro de KeyStorageProvider")
  return context
}
