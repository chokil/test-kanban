"use client"

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

function Earth({ rotationSpeed = 0.001 }: { rotationSpeed?: number }) {
  const earthRef = useRef<THREE.Mesh>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const earthGeometry = useMemo(() => new THREE.SphereGeometry(2.5, 64, 64), [])
  const cloudsGeometry = useMemo(() => new THREE.SphereGeometry(2.52, 64, 64), [])

  const earthMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
    shininess: 10,
    wireframe: true,
  }), [])

  const cloudsMaterial = useMemo(() => new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    wireframe: true,
  }), [])

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += hovered ? rotationSpeed * 3 : rotationSpeed
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += hovered ? rotationSpeed * 4 : rotationSpeed * 1.2
      cloudsRef.current.rotation.x += rotationSpeed * 0.3
    }
  })

  return (
    <group>
      <mesh
        ref={earthRef}
        geometry={earthGeometry}
        material={earthMaterial}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      />
      <mesh
        ref={cloudsRef}
        geometry={cloudsGeometry}
        material={cloudsMaterial}
      />
    </group>
  )
}

function DataPoints() {
  const points = useMemo(() => {
    const pts = []
    const radius = 2.6
    for (let i = 0; i < 50; i++) {
      const lat = (Math.random() - 0.5) * Math.PI
      const lon = Math.random() * Math.PI * 2
      const x = radius * Math.cos(lat) * Math.cos(lon)
      const y = radius * Math.sin(lat)
      const z = radius * Math.cos(lat) * Math.sin(lon)
      pts.push(new THREE.Vector3(x, y, z))
    }
    return pts
  }, [])

  return (
    <>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <boxGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial
            color={`hsl(${i * 7}, 70%, 50%)`}
            emissive={`hsl(${i * 7}, 70%, 50%)`}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </>
  )
}

function ConnectionLines() {
  const lineRef = useRef<THREE.BufferGeometry>(null)
  
  const points = useMemo(() => {
    const pts = []
    const radius = 2.7
    for (let i = 0; i < 20; i++) {
      const lat1 = (Math.random() - 0.5) * Math.PI
      const lon1 = Math.random() * Math.PI * 2
      const lat2 = (Math.random() - 0.5) * Math.PI
      const lon2 = Math.random() * Math.PI * 2
      
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(
          radius * Math.cos(lat1) * Math.cos(lon1),
          radius * Math.sin(lat1),
          radius * Math.cos(lat1) * Math.sin(lon1)
        ),
        new THREE.Vector3(
          radius * 1.5 * Math.cos(lat1) * Math.cos(lon1),
          radius * 1.5 * Math.sin(lat1),
          radius * 1.5 * Math.cos(lat1) * Math.sin(lon1)
        ),
        new THREE.Vector3(
          radius * 1.5 * Math.cos(lat2) * Math.cos(lon2),
          radius * 1.5 * Math.sin(lat2),
          radius * 1.5 * Math.cos(lat2) * Math.sin(lon2)
        ),
        new THREE.Vector3(
          radius * Math.cos(lat2) * Math.cos(lon2),
          radius * Math.sin(lat2),
          radius * Math.cos(lat2) * Math.sin(lon2)
        )
      )
      pts.push(curve.getPoints(50))
    }
    return pts
  }, [])

  return (
    <>
      {points.map((curvePoints, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={curvePoints.length}
              array={new Float32Array(curvePoints.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color={`hsl(${180 + i * 10}, 70%, 50%)`}
            transparent
            opacity={0.3}
          />
        </line>
      ))}
    </>
  )
}

export function Globe3D() {
  const { autoRotate, rotationSpeed, starCount } = useControls('Globe Settings', {
    autoRotate: true,
    rotationSpeed: { value: 0.001, min: 0, max: 0.01, step: 0.0001 },
    starCount: { value: 5000, min: 0, max: 10000, step: 100 },
  })

  return (
    <div className="relative w-full h-[600px] bg-black rounded-xl overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        <Stars
          radius={100}
          depth={50}
          count={starCount}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        
        <Earth rotationSpeed={rotationSpeed} />
        <DataPoints />
        <ConnectionLines />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          minDistance={4}
          maxDistance={20}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/80 backdrop-blur-sm bg-black/30 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">インタラクティブ3Dグローブ</h3>
        <p className="text-sm">マウスでドラッグして回転・ズーム可能</p>
        <p className="text-sm">データポイントとコネクションラインを表示</p>
      </div>
    </div>
  )
}