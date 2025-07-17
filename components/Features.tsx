"use client"

import { motion } from "framer-motion"
import { Card } from "./Card"
import { Zap, Shield, Palette, Globe, Code, Layers } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-8 w-8" />,
    title: "超高速パフォーマンス",
    description: "Next.js 14の最新機能を活用し、圧倒的な速度を実現",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "セキュアな設計",
    description: "最新のセキュリティ標準に準拠した安全な実装",
  },
  {
    icon: <Palette className="h-8 w-8" />,
    title: "美しいデザイン",
    description: "Tailwind CSSによる洗練されたモダンなUI",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "レスポンシブ対応",
    description: "あらゆるデバイスで最適な表示を実現",
  },
  {
    icon: <Code className="h-8 w-8" />,
    title: "TypeScript",
    description: "型安全性を保証する堅牢なコード",
  },
  {
    icon: <Layers className="h-8 w-8" />,
    title: "コンポーネント設計",
    description: "再利用可能な効率的なアーキテクチャ",
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">最先端の機能</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          現代のWeb開発における最高の技術を結集
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 h-full">
              <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-3 inline-flex text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}