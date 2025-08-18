"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SectionContainerProps } from "@/lib/types"
import { fadeInUp } from "@/lib/animations"

export function SectionContainer({
  title,
  subtitle,
  background = "default",
  className,
  children,
}: SectionContainerProps) {
  const backgroundClasses = {
    default: "bg-white dark:bg-gray-900",
    gradient: "bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800",
    dark: "bg-gray-900 dark:bg-black",
  }

  return (
    <section
      className={cn(
        "py-20 px-4 sm:px-6 lg:px-8",
        backgroundClasses[background],
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {title && (
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}