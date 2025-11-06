import { NextResponse } from "next/server"

// Simulação de armazenamento em memória
const keysStore: any[] = []

export async function POST(request: Request) {
  const { key } = await request.json()

  const keyData = keysStore.find((k) => k.key === key)

  if (!keyData) {
    return NextResponse.json({ valid: false, message: "Key não encontrada" })
  }

  if (keyData.used) {
    return NextResponse.json({ valid: false, message: "Key já utilizada" })
  }

  // Marcar key como usada
  keyData.used = true
  keyData.usedAt = new Date().toISOString()

  return NextResponse.json({ valid: true })
}
