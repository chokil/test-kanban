import { LucideIcon } from "lucide-react"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar: string
}

export interface NavItem {
  name: string
  href: string
}

export interface TimelineItem {
  id: number
  year: string
  title: string
  description: string
  color: string
}

export interface StatItem {
  label: string
  value: number
  suffix: string
}

export interface GalleryItem {
  id: number
  title: string
  description: string
  gradient: string
}

export interface SectionContainerProps {
  title: string
  subtitle?: string
  background?: "default" | "gradient" | "dark"
  className?: string
  children: React.ReactNode
}