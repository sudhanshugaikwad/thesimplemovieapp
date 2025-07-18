"use client"

import { cn } from "@/lib/utils"
import React, { useRef, useState, type ComponentProps, type MouseEvent } from "react"
import { Card } from "./card"

export function SpotlightCard({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: "-100%", y: "-100%" })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { left, top, width, height } =
      containerRef.current!.getBoundingClientRect()

    const x = clientX - left
    const y = clientY - top

    setPosition({ x: `${x}px`, y: `${y}px` })
  }

  const handleMouseLeave = () => {
    setPosition({ x: "-100%", y: "-100%" })
  }

  return (
    <Card
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("spotlight-card", className)}
      style={
        {
          "--spotlight-x": position.x,
          "--spotlight-y": position.y,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </Card>
  )
}
