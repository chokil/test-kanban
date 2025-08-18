"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ScrollAnimation } from "./ScrollAnimation"
import { SectionContainer } from "./SectionContainer"
import { timelineData } from "@/lib/data/timeline"

export function Timeline() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <SectionContainer
      title="未来への道のり"
      subtitle="革新的な技術で未来を創造"
      background="gradient"
    >

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-300 to-gray-100"></div>

          {timelineData.map((item, index) => (
            <ScrollAnimation key={item.id} delay={index * 0.2}>
              <motion.div
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex-1">
                  <motion.div
                    className={`bg-white p-6 rounded-2xl shadow-lg cursor-pointer ${
                      selectedItem === item.id ? "shadow-2xl" : ""
                    }`}
                    onClick={() => setSelectedItem(item.id === selectedItem ? null : item.id)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`text-3xl font-bold mb-2 ${item.color} text-white rounded-lg px-3 py-1 inline-block`}>
                      {item.year}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    
                    <AnimatePresence>
                      {selectedItem === item.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-gray-600 mt-3"
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div className="w-4 h-4 bg-white border-4 border-purple-500 rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
                
                <div className="flex-1"></div>
              </motion.div>
            </ScrollAnimation>
          ))}
        </div>
    </SectionContainer>
  )
}