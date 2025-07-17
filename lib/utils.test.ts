import { cn } from './utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500')
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })

  it('should handle false conditional classes', () => {
    const isActive = false
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class')
  })

  it('should merge and override Tailwind classes correctly', () => {
    const result = cn('px-2 py-1', 'px-4')
    expect(result).toBe('py-1 px-4')
  })

  it('should handle arrays of classes', () => {
    const result = cn(['text-sm', 'font-medium'], 'text-lg')
    expect(result).toBe('font-medium text-lg')
  })

  it('should handle undefined and null values', () => {
    const result = cn('base', undefined, null, 'end')
    expect(result).toBe('base end')
  })

  it('should handle empty strings', () => {
    const result = cn('', 'valid-class', '')
    expect(result).toBe('valid-class')
  })

  it('should handle no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle object notation', () => {
    const result = cn({
      'text-red-500': true,
      'text-blue-500': false,
      'font-bold': true,
    })
    expect(result).toBe('text-red-500 font-bold')
  })

  it('should merge complex Tailwind utilities', () => {
    const result = cn(
      'hover:bg-blue-500 focus:ring-2',
      'hover:bg-red-500 focus:ring-4'
    )
    expect(result).toContain('hover:bg-red-500')
    expect(result).toContain('focus:ring-4')
    expect(result).not.toContain('hover:bg-blue-500')
    expect(result).not.toContain('focus:ring-2')
  })
})