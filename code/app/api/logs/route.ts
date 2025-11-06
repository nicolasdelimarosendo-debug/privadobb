import { NextResponse } from "next/server"

// Simulação de armazenamento em memória
const logsStore: any[] = []

export async function GET() {
  return NextResponse.json({ logs: logsStore })
}

export async function POST(request: Request) {
  const logData = await request.json()

  // Obter IP do usuário
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

  const log = {
    ...logData,
    ip,
    timestamp: new Date().toISOString(),
  }

  logsStore.push(log)

  return NextResponse.json({ success: true })
}
