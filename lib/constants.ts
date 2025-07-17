// Animation Constants
export const ANIMATION_DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 1,
} as const

export const ANIMATION_DELAY = {
  typing: 2000,
  fadeIn: 4000,
} as const

// Scroll Constants
export const SCROLL_THRESHOLD = 10

// Style Constants
export const GRADIENTS = {
  primary: "from-purple-600 to-pink-600",
  secondary: "from-blue-600 to-teal-600",
  hero: "from-purple-600/10 to-pink-600/10",
} as const

// Breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const

// Z-Index Layers
export const Z_INDEX = {
  navigation: 50,
  modal: 100,
  tooltip: 200,
} as const