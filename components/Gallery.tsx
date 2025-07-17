"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollAnimation } from "./ScrollAnimation"

const galleryItems = [
  {
    id: 1,
    title: "革新的なデザイン",
    description: "ユーザー中心の美しいインターフェース",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    id: 2,
    title: "高速パフォーマンス",
    description: "瞬時に反応する快適な操作性",
    gradient: "from-blue-400 to-cyan-400"
  },
  {
    id: 3,
    title: "スケーラブル設計",
    description: "成長に合わせて拡張可能",
    gradient: "from-green-400 to-emerald-400"
  },
  {
    id: 4,
    title: "セキュアな環境",
    description: "最高水準のセキュリティ",
    gradient: "from-orange-400 to-red-400"
  },
  {
    id: 5,
    title: "AIの活用",
    description: "次世代の知的体験",
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    id: 6,
    title: "グローバル対応",
    description: "世界中のユーザーへ",
    gradient: "from-yellow-400 to-orange-400"
  }
]

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section ref={containerRef} className="py-20 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            体験ギャラリー
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
            >
              <ScrollAnimation delay={index * 0.1}>
                <motion.div
                  className="relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90`}></div>
                  
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="opacity-90 transform group-hover:translate-y-0 translate-y-4 transition-transform duration-300">
                      {item.description}
                    </p>
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  ></motion.div>
                </motion.div>
              </ScrollAnimation>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}