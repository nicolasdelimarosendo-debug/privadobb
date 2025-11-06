"use client"

interface LoadingScreenProps {
  message?: string
}

export function LoadingScreen({ message = "Carregando perfil..." }: LoadingScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animado */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="text-center relative z-10">
        {/* Spinner customizado */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-transparent border-t-secondary rounded-full animate-spin-reverse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#22c55e] animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.75-8 9.92-4.87-1.17-8-5.4-8-9.92V8.18l8-4z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-3 text-balance">
          <span className="text-[#22c55e]">Aguarde</span>
        </h2>
        <p className="text-muted-foreground text-lg">{message}</p>

        {/* Dots animados */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce delay-150" />
          <div className="w-3 h-3 bg-accent rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  )
}
