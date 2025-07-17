'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  mass: number
  id: number
  trail: { x: number; y: number }[]
}

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'menu' | 'win'>('menu')
  const [attractors, setAttractors] = useState<{ x: number; y: number; strength: number }[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showTutorial, setShowTutorial] = useState(true)
  const [specialEffects, setSpecialEffects] = useState<{ x: number; y: number; type: string; time: number }[]>([])

  const initializeLevel = useCallback((levelNum: number) => {
    const colors = ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF', '#06FFB4']
    const newParticles: Particle[] = []
    const particleCount = Math.min(5 + levelNum * 2, 20)
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        mass: 1 + Math.random() * 2,
        id: i,
        trail: []
      })
    }

    const attractorCount = Math.min(2 + Math.floor(levelNum / 3), 6)
    const newAttractors = []
    for (let i = 0; i < attractorCount; i++) {
      newAttractors.push({
        x: 100 + Math.random() * 600,
        y: 100 + Math.random() * 400,
        strength: 50 + Math.random() * 100
      })
    }

    setParticles(newParticles)
    setAttractors(newAttractors)
    setSpecialEffects([])
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return
    
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Create a pulse effect
      setSpecialEffects(prev => [...prev, { x, y, type: 'pulse', time: Date.now() }])

      // Apply gravitational pull to all particles
      setParticles(prev => prev.map(particle => {
        const dx = x - particle.x
        const dy = y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const force = 500 / (distance + 1)
        
        return {
          ...particle,
          vx: particle.vx + (dx / distance) * force / particle.mass,
          vy: particle.vy + (dy / distance) * force / particle.mass
        }
      }))

      setScore(prev => prev + 10)
    }
  }

  useEffect(() => {
    if (gameState === 'playing') {
      initializeLevel(level)
    }
  }, [level, gameState, initializeLevel])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw attractors
      attractors.forEach(attractor => {
        const gradient = ctx.createRadialGradient(attractor.x, attractor.y, 0, attractor.x, attractor.y, attractor.strength)
        gradient.addColorStop(0, 'rgba(138, 43, 226, 0.4)')
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(attractor.x - attractor.strength, attractor.y - attractor.strength, attractor.strength * 2, attractor.strength * 2)
      })

      // Draw special effects
      const currentTime = Date.now()
      setSpecialEffects(prev => prev.filter(effect => {
        const elapsed = currentTime - effect.time
        if (elapsed > 1000) return false

        if (effect.type === 'pulse') {
          const radius = elapsed / 5
          const alpha = 1 - elapsed / 1000
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(effect.x, effect.y, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
        return true
      }))

      // Update and draw particles
      if (gameState === 'playing') {
        setParticles(prev => {
          const updated = prev.map(particle => {
            let newVx = particle.vx
            let newVy = particle.vy

            // Apply gravity from attractors
            attractors.forEach(attractor => {
              const dx = attractor.x - particle.x
              const dy = attractor.y - particle.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              const force = attractor.strength / (distance * distance + 100)
              
              newVx += (dx / distance) * force
              newVy += (dy / distance) * force
            })

            // Apply mouse influence when hovering
            const mouseDx = mousePos.x - particle.x
            const mouseDy = mousePos.y - particle.y
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)
            if (mouseDistance < 100) {
              const mouseForce = 50 / (mouseDistance + 1)
              newVx -= (mouseDx / mouseDistance) * mouseForce / particle.mass
              newVy -= (mouseDy / mouseDistance) * mouseForce / particle.mass
            }

            // Apply damping
            newVx *= 0.99
            newVy *= 0.99

            // Update position
            let newX = particle.x + newVx
            let newY = particle.y + newVy

            // Bounce off walls
            if (newX - particle.radius < 0 || newX + particle.radius > canvas.width) {
              newVx = -newVx * 0.8
              newX = newX - particle.radius < 0 ? particle.radius : canvas.width - particle.radius
            }
            if (newY - particle.radius < 0 || newY + particle.radius > canvas.height) {
              newVy = -newVy * 0.8
              newY = newY - particle.radius < 0 ? particle.radius : canvas.height - particle.radius
            }

            // Update trail
            const trail = [...particle.trail, { x: particle.x, y: particle.y }].slice(-20)

            return {
              ...particle,
              x: newX,
              y: newY,
              vx: newVx,
              vy: newVy,
              trail
            }
          })

          // Check for collisions and merge particles
          const merged: number[] = []
          const newParticles: Particle[] = []

          updated.forEach((p1, i) => {
            if (merged.includes(i)) return

            let mergedParticle = { ...p1 }
            
            updated.forEach((p2, j) => {
              if (i === j || merged.includes(j)) return
              
              const dx = p1.x - p2.x
              const dy = p1.y - p2.y
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              if (distance < p1.radius + p2.radius) {
                merged.push(j)
                mergedParticle.radius = Math.sqrt(p1.radius * p1.radius + p2.radius * p2.radius)
                mergedParticle.mass = p1.mass + p2.mass
                mergedParticle.vx = (p1.vx * p1.mass + p2.vx * p2.mass) / mergedParticle.mass
                mergedParticle.vy = (p1.vy * p1.mass + p2.vy * p2.mass) / mergedParticle.mass
                setScore(prev => prev + 50)
                setSpecialEffects(prev => [...prev, { x: p1.x, y: p1.y, type: 'pulse', time: Date.now() }])
              }
            })

            newParticles.push(mergedParticle)
          })

          // Check win condition
          if (newParticles.length === 1 && level < 10) {
            setGameState('win')
            setScore(prev => prev + 1000 * level)
          }

          return newParticles
        })
      }

      // Draw particles
      particles.forEach(particle => {
        // Draw trail
        particle.trail.forEach((point, i) => {
          const alpha = i / particle.trail.length * 0.5
          ctx.fillStyle = particle.color.replace(')', `, ${alpha})`)
          ctx.fillRect(point.x - 1, point.y - 1, 2, 2)
        })

        // Draw particle with glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 2)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(0.5, particle.color.replace(')', ', 0.5)'))
        gradient.addColorStop(1, particle.color.replace(')', ', 0)'))
        ctx.fillStyle = gradient
        ctx.fillRect(particle.x - particle.radius * 2, particle.y - particle.radius * 2, particle.radius * 4, particle.radius * 4)

        // Draw particle core
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (gameState === 'playing' || gameState === 'win') {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, gameState, attractors, mousePos, level])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
            重力パズル - Gravity Puzzle
          </h1>

          <div className="max-w-4xl mx-auto">
            {/* Game Stats */}
            <div className="flex justify-between items-center mb-4 px-4">
              <div className="text-xl">
                スコア: <span className="font-bold text-yellow-400">{score}</span>
              </div>
              <div className="text-xl">
                レベル: <span className="font-bold text-green-400">{level}</span>
              </div>
              <div className="text-xl">
                パーティクル: <span className="font-bold text-blue-400">{particles.length}</span>
              </div>
            </div>

            {/* Game Canvas */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full cursor-crosshair"
                onMouseMove={handleMouseMove}
                onClick={handleClick}
              />

              {/* Game Menu */}
              {gameState === 'menu' && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">重力パズルへようこそ！</h2>
                    <p className="mb-8 max-w-md mx-auto">
                      クリックで重力波を発生させ、すべてのパーティクルを1つに融合させよう！
                    </p>
                    <button
                      onClick={() => {
                        setGameState('playing')
                        setScore(0)
                        setLevel(1)
                        setShowTutorial(true)
                      }}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
                    >
                      ゲームスタート
                    </button>
                  </div>
                </div>
              )}

              {/* Win Screen */}
              {gameState === 'win' && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 text-yellow-400">レベルクリア！</h2>
                    <p className="text-2xl mb-8">
                      スコア: {score}
                    </p>
                    <button
                      onClick={() => {
                        setLevel(prev => prev + 1)
                        setGameState('playing')
                      }}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
                    >
                      次のレベルへ
                    </button>
                  </div>
                </div>
              )}

              {/* Tutorial */}
              {showTutorial && gameState === 'playing' && (
                <div className="absolute top-4 left-4 right-4 bg-gray-800 bg-opacity-90 p-4 rounded-lg">
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="float-right text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                  <h3 className="font-bold mb-2">遊び方</h3>
                  <ul className="text-sm space-y-1">
                    <li>• 画面をクリックして重力波を発生</li>
                    <li>• パーティクルを引き寄せて融合</li>
                    <li>• すべてを1つにまとめたらクリア</li>
                    <li>• マウスを近づけると反発します</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Game Controls */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setGameState(gameState === 'playing' ? 'paused' : 'playing')}
                className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg transition-colors"
              >
                {gameState === 'playing' ? '一時停止' : '再開'}
              </button>
              <button
                onClick={() => {
                  setGameState('menu')
                  setScore(0)
                  setLevel(1)
                }}
                className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg transition-colors"
              >
                リセット
              </button>
            </div>

            {/* Game Description */}
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">重力の力で宇宙を操れ！</h2>
              <p className="text-gray-300 mb-4">
                このゲームでは、あなたは重力を操る神となり、散らばったパーティクルを1つに融合させることが目標です。
                クリックで重力波を発生させ、マウスカーソルで反重力フィールドを作り出すことができます。
              </p>
              <p className="text-gray-300">
                レベルが上がるごとに、より多くのパーティクルと重力源が登場し、
                複雑な物理シミュレーションがあなたの挑戦を待っています。
                さあ、宇宙の法則を味方につけて、究極のパズルに挑戦しましょう！
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}