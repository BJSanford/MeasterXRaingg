"use client"

import { useEffect, useRef } from "react"

export default function CityOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCitySkyline(ctx, canvas.width, canvas.height)
    }

    // Draw city skyline
    const drawCitySkyline = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Set gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, "rgba(88, 28, 135, 0.3)") // purple-900 with transparency
      gradient.addColorStop(0.5, "rgba(30, 10, 60, 0.2)") // mid purple with transparency
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)") // black with transparency
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw stars
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
      for (let i = 0; i < width * 0.05; i++) {
        const x = Math.random() * width
        const y = Math.random() * height * 0.7
        const size = Math.random() * 1.5
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw distant buildings (background layer)
      ctx.fillStyle = "rgba(30, 10, 60, 0.4)"
      const bgBuildingCount = Math.floor(width / 40)
      const bgMaxHeight = height * 0.3
      const bgMinHeight = height * 0.05

      for (let i = 0; i < bgBuildingCount; i++) {
        const buildingWidth = Math.random() * 80 + 40
        const buildingHeight = Math.random() * (bgMaxHeight - bgMinHeight) + bgMinHeight
        const x = (width / bgBuildingCount) * i
        const y = height * 0.7 - buildingHeight

        // Draw building
        ctx.fillRect(x, y, buildingWidth, buildingHeight)
      }

      // Draw city buildings (foreground layer)
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"

      // Generate random buildings
      const buildingCount = Math.floor(width / 30)
      const maxHeight = height * 0.6
      const minHeight = height * 0.1

      for (let i = 0; i < buildingCount; i++) {
        const buildingWidth = Math.random() * 60 + 20
        const buildingHeight = Math.random() * (maxHeight - minHeight) + minHeight
        const x = (width / buildingCount) * i
        const y = height - buildingHeight

        // Draw building
        ctx.fillRect(x, y, buildingWidth, buildingHeight)

        // Add windows
        const windowColors = [
          "rgba(147, 51, 234, 0.7)", // purple-600
          "rgba(168, 85, 247, 0.6)", // purple-500
          "rgba(192, 132, 252, 0.5)", // purple-400
          "rgba(216, 180, 254, 0.4)", // purple-300
        ]

        const windowSize = 4
        const windowSpacing = 10
        const windowRows = Math.floor(buildingHeight / windowSpacing)
        const windowCols = Math.floor(buildingWidth / windowSpacing)

        for (let row = 0; row < windowRows; row++) {
          for (let col = 0; col < windowCols; col++) {
            // Only draw some windows (random pattern)
            if (Math.random() > 0.5) {
              // Randomly select a color from the array
              const colorIndex = Math.floor(Math.random() * windowColors.length)
              ctx.fillStyle = windowColors[colorIndex]

              ctx.fillRect(
                x + col * windowSpacing + windowSpacing / 2,
                y + row * windowSpacing + windowSpacing / 2,
                windowSize,
                windowSize,
              )
            }
          }
        }

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      }
    }

    // Initial setup
    resizeCanvas()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-30 mix-blend-soft-light"
    />
  )
}
