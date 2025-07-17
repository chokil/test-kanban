import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from 'web-vitals'

interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

const vitalsUrl = process.env.NEXT_PUBLIC_ANALYTICS_URL

function getConnectionSpeed() {
  if ('connection' in navigator && 'effectiveType' in (navigator as any).connection) {
    return (navigator as any).connection.effectiveType
  }
  return 'unknown'
}

function sendToAnalytics(metric: Metric) {
  const body: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating || 'needs-improvement',
    timestamp: Date.now(),
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', body)
  }

  if (vitalsUrl) {
    fetch(vitalsUrl, {
      body: JSON.stringify({
        ...body,
        connectionSpeed: getConnectionSpeed(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.error('[Web Vitals] Failed to send metrics:', error)
    })
  }
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onFCP(sendToAnalytics)
  onINP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}

export function checkCoreWebVitals(): Promise<{
  lcp: number | null
  fid: number | null
  cls: number | null
}> {
  return new Promise((resolve) => {
    let lcp: number | null = null
    let fid: number | null = null
    let cls: number | null = null
    let metricsReceived = 0

    const checkComplete = () => {
      metricsReceived++
      if (metricsReceived === 3) {
        resolve({ lcp, fid, cls })
      }
    }

    onLCP((metric) => {
      lcp = metric.value
      checkComplete()
    })

    onINP((metric) => {
      fid = metric.value
      checkComplete()
    })

    onCLS((metric) => {
      cls = metric.value
      checkComplete()
    })

    setTimeout(() => {
      resolve({ lcp, fid, cls })
    }, 10000)
  })
}