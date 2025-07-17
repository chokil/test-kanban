"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThreeExperience } from "./ThreeExperience"
import { AIPersonalization } from "./AIPersonalization"
import { ParticleField } from "./ParticleField"
import { Sparkles, Cpu, Layers, Zap, Headphones, Hand } from "lucide-react"
import { SpatialAudio } from "./SpatialAudio"
import { GestureControl } from "./GestureControl"

const experiences = [
  {
    id: "3d",
    title: "3D インタラクティブ",
    description: "WebGLとThree.jsによる没入型3D体験",
    icon: <Layers className="w-6 h-6" />,
    component: <ThreeExperience />
  },
  {
    id: "ai",
    title: "AI パーソナライゼーション",
    description: "人工知能があなたの個性を分析",
    icon: <Cpu className="w-6 h-6" />,
    component: <AIPersonalization />
  },
  {
    id: "particles",
    title: "パーティクルフィールド",
    description: "数千の粒子が織りなすダイナミックな空間",
    icon: <Sparkles className="w-6 h-6" />,
    component: <ParticleField />
  },
  {
    id: "audio",
    title: "空間音響",
    description: "Web Audio APIによる3Dサウンド体験",
    icon: <Headphones className="w-6 h-6" />,
    component: <SpatialAudio />
  },
  {
    id: "gesture",
    title: "ジェスチャー操作",
    description: "モーションセンサーで操る新しいUI",
    icon: <Hand className="w-6 h-6" />,
    component: <GestureControl />
  }
]

export function ImmersiveExperience() {
  const [activeExperience, setActiveExperience] = useState("3d")
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              未知の体験へようこそ
            </h2>
          </div>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            最先端技術を駆使した、これまでにないインタラクティブな体験をお楽しみください
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {experiences.map((exp) => (
            <motion.button
              key={exp.id}
              onClick={() => setActiveExperience(exp.id)}
              className={`
                px-6 py-4 rounded-lg border transition-all duration-300
                ${activeExperience === exp.id
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white"
                  : "bg-white/5 border-white/20 text-white/70 hover:bg-white/10 hover:text-white"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                {exp.icon}
                <div className="text-left">
                  <div className="font-semibold">{exp.title}</div>
                  <div className="text-sm opacity-70">{exp.description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
        
        <motion.div
          key={activeExperience}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {experiences.find(exp => exp.id === activeExperience)?.component}
        </motion.div>
      </div>
    </section>
  )
}