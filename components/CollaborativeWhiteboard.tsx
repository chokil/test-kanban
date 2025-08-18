"use client"

import { useRef, useState, useEffect, MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
}

interface Line {
  id: string
  points: Point[]
  color: string
  width: number
  timestamp: number
}

interface Cursor {
  id: string
  x: number
  y: number
  color: string
  name: string
}

export function CollaborativeWhiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState('#000000')
  const [currentWidth, setCurrentWidth] = useState(2)
  const [lines, setLines] = useState<Line[]>([])
  const [currentLine, setCurrentLine] = useState<Point[]>([])
  const [cursors, setCursors] = useState<Cursor[]>([])
  const [showWhiteboard, setShowWhiteboard] = useState(false)

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF']
  const widths = [1, 2, 5, 10]

  useEffect(() => {
    if (!canvasRef.current || !showWhiteboard) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    lines.forEach((line) => {
      if (line.points.length < 2) return
      
      ctx.beginPath()
      ctx.strokeStyle = line.color
      ctx.lineWidth = line.width
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      ctx.moveTo(line.points[0].x, line.points[0].y)
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y)
      }
      ctx.stroke()
    })

    if (currentLine.length >= 2) {
      ctx.beginPath()
      ctx.strokeStyle = currentColor
      ctx.lineWidth = currentWidth
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      ctx.moveTo(currentLine[0].x, currentLine[0].y)
      for (let i = 1; i < currentLine.length; i++) {
        ctx.lineTo(currentLine[i].x, currentLine[i].y)
      }
      ctx.stroke()
    }
  }, [lines, currentLine, currentColor, currentWidth, showWhiteboard])

  const startDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setIsDrawing(true)
    setCurrentLine([{ x, y }])
  }

  const draw = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCurrentLine((prev) => [...prev, { x, y }])
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    
    if (currentLine.length > 1) {
      const newLine: Line = {
        id: Date.now().toString(),
        points: currentLine,
        color: currentColor,
        width: currentWidth,
        timestamp: Date.now(),
      }
      setLines((prev) => [...prev, newLine])
    }
    
    setIsDrawing(false)
    setCurrentLine([])
  }

  const clearCanvas = () => {
    setLines([])
    setCurrentLine([])
  }

  const simulateCollaborators = () => {
    const names = ['田中さん', '佐藤さん', '鈴木さん']
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1']
    
    const interval = setInterval(() => {
      setCursors((prev) => {
        const newCursors = names.map((name, i) => ({
          id: i.toString(),
          x: Math.random() * 800,
          y: Math.random() * 600,
          color: colors[i],
          name,
        }))
        return newCursors
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (showWhiteboard) {
      const cleanup = simulateCollaborators()
      return cleanup
    }
  }, [showWhiteboard])

  return (
    <>
      <motion.button
        onClick={() => setShowWhiteboard(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </motion.button>

      {showWhiteboard && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-2xl font-bold">コラボレーションホワイトボード</h2>
              <button
                onClick={() => setShowWhiteboard(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        currentColor === color ? 'border-gray-900' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  {widths.map((width) => (
                    <button
                      key={width}
                      onClick={() => setCurrentWidth(width)}
                      className={`px-3 py-1 rounded ${
                        currentWidth === width
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {width}px
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  クリア
                </button>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="border border-gray-300 rounded-lg cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                
                {cursors.map((cursor) => (
                  <motion.div
                    key={cursor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: cursor.x, y: cursor.y }}
                    className="absolute pointer-events-none"
                    style={{ left: 0, top: 0 }}
                  >
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: cursor.color }}
                    />
                    <div
                      className="absolute top-4 left-4 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                      style={{ backgroundColor: cursor.color }}
                    >
                      {cursor.name}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>リアルタイムでコラボレーション中の参加者が表示されます</p>
                <p>マウスで自由に描画できます</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}