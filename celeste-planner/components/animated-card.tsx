"use client"

import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: "slide" | "fade" | "scale"
}

export function AnimatedCard({ children, delay = 0, className = "", variant = "slide" }: AnimatedCardProps) {
  const animationClasses = {
    slide: "animate-slide-in",
    fade: "animate-fade-in",
    scale: "animate-scale-in",
  }

  return (
    <div
      className={`${animationClasses[variant]} ${className} transform-gpu`}
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
