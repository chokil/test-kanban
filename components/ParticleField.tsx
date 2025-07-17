"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 5000 }) {
  const points = useRef<THREE.Points>(null)
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.7, 0.5)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return { positions, colors }
  }, [count])
  
  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.elapsedTime
    points.current.rotation.x = time * 0.1
    points.current.rotation.y = time * 0.15
    
    const positions = points.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const x = positions[i3]
      const y = positions[i3 + 1]
      
      positions[i3 + 1] = y + Math.sin((time + x) * 0.5) * 0.002
    }
    
    points.current.geometry.attributes.position.needsUpdate = true
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

export function ParticleField() {
  return (
    <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Particles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold mb-2">量子パーティクルフィールド</h3>
        <p className="text-sm opacity-80">5000個の粒子が織りなす宇宙空間</p>
      </div>
    </div>
  )
}