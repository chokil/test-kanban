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