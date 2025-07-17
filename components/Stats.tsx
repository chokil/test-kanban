"use client"

import { useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ScrollAnimation } from "./ScrollAnimation"

const stats = [
  { label: "アクティブユーザー", value: 1000000, suffix: "+" },
  { label: "満足度", value: 98, suffix: "%" },
  { label: "処理速度向上", value: 300, suffix: "%" },
  { label: "グローバル展開国数", value: 50, suffix: "ヶ国" }
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold">
      {displayValue.toLocaleString()}
      {suffix}
    </div>
  )
}

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            数字で見る成果
          </h2>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <ScrollAnimation key={index} delay={index * 0.1}>
              <motion.div
                className="text-center p-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <div className="text-xl mt-4 opacity-90">{stat.label}</div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}