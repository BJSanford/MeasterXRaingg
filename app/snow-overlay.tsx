"use client"

import { useEffect, useRef } from "react"

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  opacity: number
  swing: number
  swingOffset: number
}

export default function SnowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reinitialize snowflakes when resizing
      initSnowflakes()
    }

    // Initialize snowflakes
    const initSnowflakes = () => {
      const snowflakeCount = Math.floor((canvas.width * canvas.height) / 6000) // Adjust density
      snowflakesRef.current = []

      for (let i = 0; i < snowflakeCount; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speed: Math.random() * 1 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          swing: Math.random() * 2 + 1,
          swingOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    // Draw snowflakes
    const drawSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakesRef.current.forEach((snowflake) => {
        ctx.beginPath()
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`
        ctx.fill()
      })
    }

    // Update snowflake positions
    const updateSnowflakes = () => {
      snowflakesRef.current.forEach((snowflake) => {
        // Add horizontal swing using sine wave
        snowflake.x += Math.sin(Date.now() * 0.001 * snowflake.swing + snowflake.swingOffset) * 0.5
        snowflake.y += snowflake.speed

        // Reset snowflake when it goes off screen
        if (snowflake.y > canvas.height) {
          snowflake.y = -5
          snowflake.x = Math.random() * canvas.width
        }

        // Reset snowflake if it goes off the sides
        if (snowflake.x < -5) snowflake.x = canvas.width + 5
        if (snowflake.x > canvas.width + 5) snowflake.x = -5
      })
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      updateSnowflakes()
      drawSnowflakes()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Initial setup
    resizeCanvas()
    animate()

    // Handle window resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 h-full w-full opacity-70"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
