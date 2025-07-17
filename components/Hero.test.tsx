import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

jest.mock('framer-motion', () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>(({ children, initial, animate, transition, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  ))
  MockDiv.displayName = 'MotionDiv'
  
  return {
    motion: {
      div: MockDiv
    }
  }
})

jest.mock('./Button', () => ({
  Button: ({ children, className, size, variant, ...props }: any) => (
    <button className={className} data-size={size} data-variant={variant} {...props}>
      {children}
    </button>
  )
}))

describe('Hero Component', () => {
  it('should render the main heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('次世代のWeb体験')
  })

  it('should render the subtitle', () => {
    render(<Hero />)
    expect(screen.getByText('最新技術を駆使した、美しく高速なウェブサイトをご体験ください')).toBeInTheDocument()
  })

  it('should render two buttons', () => {
    render(<Hero />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('should render the primary button with correct text', () => {
    render(<Hero />)
    const primaryButton = screen.getByRole('button', { name: /はじめる/ })
    expect(primaryButton).toBeInTheDocument()
    expect(primaryButton).toHaveAttribute('data-size', 'lg')
  })

  it('should render the secondary button with correct text and variant', () => {
    render(<Hero />)
    const secondaryButton = screen.getByRole('button', { name: '詳しく見る' })
    expect(secondaryButton).toBeInTheDocument()
    expect(secondaryButton).toHaveAttribute('data-size', 'lg')
    expect(secondaryButton).toHaveAttribute('data-variant', 'outline')
  })

  it('should have proper section structure', () => {
    const { container } = render(<Hero />)
    const section = container.querySelector('section')
    
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('relative', 'min-h-screen', 'flex', 'items-center', 'justify-center')
  })

  it('should render background gradient', () => {
    const { container } = render(<Hero />)
    const gradient = container.querySelector('.bg-gradient-to-br')
    
    expect(gradient).toBeInTheDocument()
    expect(gradient).toHaveClass('absolute', 'inset-0')
  })

  it('should render decorative blob elements', () => {
    const { container } = render(<Hero />)
    const blobs = container.querySelectorAll('.rounded-full.mix-blend-multiply')
    
    expect(blobs).toHaveLength(3)
    expect(blobs[0]).toHaveClass('bg-purple-300')
    expect(blobs[1]).toHaveClass('bg-yellow-300')
    expect(blobs[2]).toHaveClass('bg-pink-300')
  })

  it('should have gradient text styling on heading', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    
    expect(heading).toHaveClass('bg-clip-text', 'text-transparent', 'bg-gradient-to-r')
  })

  it('should have responsive text sizes', () => {
    render(<Hero />)
    const heading = screen.getByRole('heading', { level: 1 })
    const subtitle = screen.getByText('最新技術を駆使した、美しく高速なウェブサイトをご体験ください')
    
    expect(heading).toHaveClass('text-5xl', 'sm:text-6xl', 'md:text-7xl')
    expect(subtitle).toHaveClass('text-xl', 'sm:text-2xl')
  })

  it('should center content with proper max width', () => {
    const { container } = render(<Hero />)
    const contentWrapper = container.querySelector('.max-w-7xl.mx-auto')
    
    expect(contentWrapper).toBeInTheDocument()
    expect(contentWrapper).toHaveClass('text-center')
  })

  it('should have flex layout for buttons', () => {
    const { container } = render(<Hero />)
    const buttonContainer = container.querySelector('.flex.flex-col.sm\\:flex-row')
    
    expect(buttonContainer).toBeInTheDocument()
    expect(buttonContainer).toHaveClass('gap-4', 'justify-center')
  })
})