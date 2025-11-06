import { NextResponse } from "next/server"
import crypto from "crypto"

// Simulação de armazenamento em memória
const keysStore: any[] = []

export async function POST(request: Request) {
  const { count } = await request.json()

  const newKeys = []
  for (let i = 0; i < count; i++) {
    const key = crypto.randomBytes(32).toString("hex")
    const keyData = {
      key,
      used: false,
      createdAt: new Date().toISOString(),
      usedBy: null,
      usedAt: null,
    }
    keysStore.push(keyData)
    newKeys.push(keyData)
  }

  return NextResponse.json({ keys: newKeys })
}
