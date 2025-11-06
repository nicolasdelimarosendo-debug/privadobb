import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "Username é obrigatório" }, { status: 400 })
  }

  try {
    // Buscar ID do usuário pelo username
    const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}&limit=10`)

    if (!userResponse.ok) {
      throw new Error("Erro ao buscar usuário")
    }

    const userData = await userResponse.json()

    if (!userData.data || userData.data.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    const userId = userData.data[0].id

    // Buscar informações detalhadas do usuário
    const detailsResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`)

    if (!detailsResponse.ok) {
      throw new Error("Erro ao buscar detalhes do usuário")
    }

    const userDetails = await detailsResponse.json()

    // Buscar avatar do usuário
    const avatarResponse = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`,
    )

    if (!avatarResponse.ok) {
      throw new Error("Erro ao buscar avatar")
    }

    const avatarData = await avatarResponse.json()

    return NextResponse.json({
      ...userDetails,
      avatarUrl: avatarData.data[0]?.imageUrl || "/roblox-avatar.png",
    })
  } catch (error) {
    console.error("[v0] Erro na API Roblox:", error)
    return NextResponse.json({ error: "Erro ao buscar dados do usuário" }, { status: 500 })
  }
}
