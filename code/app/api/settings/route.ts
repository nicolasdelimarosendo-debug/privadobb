import { NextResponse } from "next/server"

// Simulação de armazenamento em memória
const settings = {
  groupLink: "https://www.roblox.com.ml/communities/5771900249/Generator-Robux",
}

export async function GET() {
  return NextResponse.json(settings)
}

export async function POST(request: Request) {
  const { groupLink } = await request.json()

  if (groupLink) {
    settings.groupLink = groupLink
  }

  return NextResponse.json({ success: true })
}
