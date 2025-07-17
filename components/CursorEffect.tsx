"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Trail {
  x: number
  y: number
  id: number
}

export function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [trails, setTrails] = useState<Trail[]>([])
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let trailId = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      if (isActive) {
        const newTrail: Trail = {
          x: e.clientX,
          y: e.clientY,
          id: trailId++
        }
        
        setTrails(prev => [...prev.slice(-20), newTrail])
      }
    }
    
    const handleMouseDown = () => setIsActive(true)
    const handleMouseUp = () => {
      setIsActive(false)
      setTrails([])
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isActive])
  
  useEffect(() => {
    if (trails.length > 0) {
      const timer = setTimeout(() => {
        setTrails(prev => prev.slice(1))
      }, 50)
      
      return () => clearTimeout(timer)
    }
  }, [trails])

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: isActive ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="w-full h-full rounded-full bg-white opacity-50" />
      </motion.div>
      
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: trail.x,
            top: trail.y,
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: `hsl(${(index / trails.length) * 360}, 100%, 50%)`,
              boxShadow: `0 0 10px hsl(${(index / trails.length) * 360}, 100%, 50%)`,
            }}
          />
        </motion.div>
      ))}
    </>
  )
}