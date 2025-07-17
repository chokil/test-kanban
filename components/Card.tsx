"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  hover?: boolean
  children: React.ReactNode
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-lg backdrop-blur-sm",
        "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}