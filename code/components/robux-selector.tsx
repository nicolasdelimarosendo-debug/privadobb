"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface RobuxSelectorProps {
  onSelect: (amount: number) => void
  onCancel: () => void
}

const robuxOptions = [{ amount: 2400 }, { amount: 4500 }, { amount: 8200 }, { amount: 10000 }]

export function RobuxSelector({ onSelect, onCancel }: RobuxSelectorProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)

  const handleConfirm = () => {
    if (selectedAmount) {
      onSelect(selectedAmount)
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#22c55e] rounded-2xl mb-4 shadow-lg shadow-[#22c55e]/50">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Selecione a Quantidade de <span className="text-[#22c55e]">Robux</span>
          </h1>
          <p className="text-muted-foreground">Escolha quanto você deseja gerar</p>
        </div>

        <div className="space-y-4 mb-6">
          {robuxOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => setSelectedAmount(option.amount)}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedAmount === option.amount
                  ? "border-[#22c55e] bg-[#22c55e]/10 scale-105 shadow-lg shadow-[#22c55e]/30"
                  : "border-border bg-muted/50 hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#22c55e]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-foreground">{option.amount.toLocaleString()}</p>
                    <p className="text-sm text-[#22c55e] font-medium">Robux</p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedAmount === option.amount ? "border-[#22c55e] bg-[#22c55e]" : "border-muted-foreground"
                  }`}
                >
                  {selectedAmount === option.amount && (
                    <svg className="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={!selectedAmount}
            className="w-full h-14 text-lg font-bold bg-[#22c55e] hover:bg-[#16a34a] text-white shadow-lg shadow-[#22c55e]/30 transition-all hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Confirmar Seleção
          </Button>

          <Button
            onClick={onCancel}
            variant="outline"
            className="w-full h-12 text-lg font-bold border-2 hover:bg-muted bg-transparent"
          >
            Voltar
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
