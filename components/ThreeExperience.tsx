"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Float, Stars, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

function AnimatedSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    meshRef.current.scale.setScalar(hovered ? 1.5 : 1)
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          speed={5}
          distort={0.5}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0080" />
      
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <AnimatedSphere position={[-3, 0, 0]} color="#ff0080" />
      <AnimatedSphere position={[3, 0, 0]} color="#00ffff" />
      <AnimatedSphere position={[0, 3, 0]} color="#ffff00" />
      <AnimatedSphere position={[0, -3, 0]} color="#00ff00" />
      
      <Text
        position={[0, 0, -5]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Interactive 3D World
      </Text>
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

export function ThreeExperience() {
  return (
    <div className="relative w-full h-[600px] bg-black rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="absolute inset-0"
      >
        <Scene />
      </Canvas>
      <div className="absolute top-4 left-4 text-white bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-2">3D インタラクティブ体験</h3>
        <p className="text-sm opacity-80">マウスでドラッグして視点を変更できます</p>
        <p className="text-sm opacity-80">球体にホバーすると拡大します</p>
      </div>
    </div>
  )
}