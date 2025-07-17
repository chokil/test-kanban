import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 1分
  uniqueTokenPerInterval: 10, // 1分あたり10リクエスト
})

export async function GET(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous'
  const { success, limit, remaining, reset } = await limiter.check(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too Many Requests' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString(),
          'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
        },
      }
    )
  }

  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    {
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': new Date(reset).toISOString(),
      },
    }
  )
}