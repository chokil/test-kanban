type RateLimitEntry = {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

interface RateLimitConfig {
  interval: number // milliseconds
  uniqueTokenPerInterval: number
}

export function rateLimit(config: RateLimitConfig) {
  return {
    check: async (identifier: string): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> => {
      const now = Date.now()
      const entry = rateLimitStore.get(identifier)

      if (!entry || now > entry.resetTime) {
        rateLimitStore.set(identifier, {
          count: 1,
          resetTime: now + config.interval,
        })
        return {
          success: true,
          limit: config.uniqueTokenPerInterval,
          remaining: config.uniqueTokenPerInterval - 1,
          reset: now + config.interval,
        }
      }

      if (entry.count >= config.uniqueTokenPerInterval) {
        return {
          success: false,
          limit: config.uniqueTokenPerInterval,
          remaining: 0,
          reset: entry.resetTime,
        }
      }

      entry.count++
      return {
        success: true,
        limit: config.uniqueTokenPerInterval,
        remaining: config.uniqueTokenPerInterval - entry.count,
        reset: entry.resetTime,
      }
    },
  }
}

// 定期的なクリーンアップ（メモリリーク防止）
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const entries = Array.from(rateLimitStore.entries())
    for (const [key, value] of entries) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key)
      }
    }
  }, 60000) // 1分ごとにクリーンアップ
}