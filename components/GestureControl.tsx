"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Move, Hand, Smartphone, RotateCw } from "lucide-react"

export function GestureControl() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })
  const [hasPermission, setHasPermission] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  const boxRotateX = useTransform(rotateX, [-45, 45], [-30, 30])
  const boxRotateY = useTransform(rotateY, [-45, 45], [-30, 30])
  
  useEffect(() => {
    setIsSupported("DeviceOrientationEvent" in window)
  }, [])
  
  const requestPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        setHasPermission(permission === "granted")
      } catch (error) {
        console.error("Permission request failed:", error)
      }
    } else {
      setHasPermission(true)
    }
    
    if (hasPermission || !("requestPermission" in DeviceOrientationEvent)) {
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }
  
  const handleOrientation = (event: DeviceOrientationEvent) => {
    if (event.beta !== null && event.gamma !== null && event.alpha !== null) {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      })
      
      rotateX.set(event.beta)
      rotateY.set(event.gamma)
    }
  }
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const angleY = ((x - centerX) / centerX) * 30
    const angleX = ((y - centerY) / centerY) * -30
    
    rotateX.set(angleX)
    rotateY.set(angleY)
  }
  
  return (
    <div className="bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg p-8 backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <Hand className="w-8 h-8 text-green-400" />
        <h3 className="text-2xl font-bold text-white">ジェスチャーコントロール</h3>
      </div>
      
      {!isSupported ? (
        <div className="text-center py-12">
          <Smartphone className="w-16 h-16 text-white/50 mx-auto mb-4" />
          <p className="text-white/70">
            このデバイスはモーションセンサーをサポートしていません。
            <br />
            マウスを使って3Dオブジェクトを操作してください。
          </p>
        </div>
      ) : !hasPermission ? (
        <div className="text-center py-12">
          <motion.button
            onClick={requestPermission}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white font-medium hover:from-green-700 hover:to-blue-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Smartphone className="w-6 h-6 inline-block mr-2" />
            モーションセンサーを有効にする
          </motion.button>
          <p className="text-white/60 text-sm mt-4">
            スマートフォンの傾きでオブジェクトを操作できます
          </p>
        </div>
      ) : null}
      
      <div 
        className="relative h-96 flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          rotateX.set(0)
          rotateY.set(0)
        }}
      >
        <motion.div
          className="relative w-48 h-48"
          style={{
            rotateX: boxRotateX,
            rotateY: boxRotateY,
            transformPerspective: 1000,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl opacity-20" />
          <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg opacity-40" />
          <div className="absolute inset-4 bg-gradient-to-br from-green-300 to-blue-300 rounded-md opacity-60" />
          <div className="absolute inset-6 bg-gradient-to-br from-green-200 to-blue-200 rounded flex items-center justify-center">
            <RotateCw className="w-12 h-12 text-white animate-spin-slow" />
          </div>
          
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {hasPermission && (
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/60 text-sm">Alpha</p>
            <p className="text-white font-mono">{orientation.alpha.toFixed(1)}°</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/60 text-sm">Beta</p>
            <p className="text-white font-mono">{orientation.beta.toFixed(1)}°</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <p className="text-white/60 text-sm">Gamma</p>
            <p className="text-white font-mono">{orientation.gamma.toFixed(1)}°</p>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex items-center gap-2 text-white/60 text-sm">
        <Move className="w-4 h-4" />
        <p>デバイスを傾けるか、マウスを動かしてオブジェクトを操作</p>
      </div>
    </div>
  )
}