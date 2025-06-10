"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const particles = useRef<any[]>([])

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Canvas background animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    const particleCount = 100
    if (particles.current.length === 0) {
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#22d3ee" : "#ffffff",
          speed: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.5 + 0.1,
          direction: Math.random() * 360,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(10, 10, 20, 1)")
      gradient.addColorStop(1, "rgba(15, 15, 30, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.current.forEach((particle, i) => {
        const radian = (particle.direction * Math.PI) / 180
        particle.x += Math.cos(radian) * particle.speed
        particle.y += Math.sin(radian) * particle.speed

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(")", `, ${particle.opacity})`)
        ctx.fill()

        // Draw glow for some particles
        if (i % 5 === 0) {
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = particle.color.replace(")", ", 0.05)")
          ctx.fill()
        }
      })

      // Draw subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)"
      ctx.lineWidth = 1
      const gridSize = 50
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <>
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />

      {/* Animated Gradient Overlays */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-[150px] animate-pulse-slow"
          style={{ transform: `translate(${-50 + scrollY * 0.02}px, ${-100 + scrollY * 0.05}px)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-cyan-600/5 rounded-full blur-[150px] animate-pulse-slower"
          style={{ transform: `translate(${50 - scrollY * 0.02}px, ${100 - scrollY * 0.05}px)` }}
        />
      </div>
    </>
  )
}
