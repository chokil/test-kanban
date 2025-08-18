"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ScrollAnimation } from "./ScrollAnimation"
import { SectionContainer } from "./SectionContainer"
import { galleryData } from "@/lib/data/gallery"

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
      <SectionContainer title="体験ギャラリー" subtitle="革新的な機能をご覧ください">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryData.map((item, index) => (
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
      </SectionContainer>
    </section>
  )
}