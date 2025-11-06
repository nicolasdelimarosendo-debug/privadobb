import { NextResponse } from "next/server"

// Simulação de armazenamento em memória (em produção, use um banco de dados)
const keysStore: any[] = []

export async function GET() {
  return NextResponse.json({ keys: keysStore })
}
