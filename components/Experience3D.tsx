'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Environment, Text, Box, Sphere, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ParticleField } from './ParticleField';

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} position={[-3, 0, 0]}>
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function WobblyBox() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[3, 0, 0]}>
      <MeshWobbleMaterial
        color="#EC4899"
        attach="material"
        factor={1}
        speed={2}
        roughness={0.3}
        metalness={0.5}
      />
    </Box>
  );
}

function FloatingText() {
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[-0.3, 0.3]}
    >
      <Text
        fontSize={1.5}
        color="#60A5FA"
        anchorX="center"
        anchorY="middle"
      >
        Experience
        <meshStandardMaterial 
          color="#60A5FA" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#60A5FA"
          emissiveIntensity={0.2}
        />
      </Text>
    </Float>
  );
}

export default function Experience3D() {
  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8B5CF6" />
          
          <AnimatedSphere />
          <WobblyBox />
          <FloatingText />
          <ParticleField />
          
          <Environment preset="city" />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}