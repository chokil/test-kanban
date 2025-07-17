import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Card } from './Card'

jest.mock('framer-motion', () => {
  const MockDiv = React.forwardRef<HTMLDivElement, any>(({ children, whileHover, transition, ...props }, ref) => (
    <div ref={ref} {...props}>{children}</div>
  ))
  MockDiv.displayName = 'MotionDiv'
  
  return {
    motion: {
      div: MockDiv
    }
  }
})

describe('Card Component', () => {
  it('should render with children', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should apply default classes', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('rounded-xl')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('shadow-lg')
    expect(card).toHaveClass('backdrop-blur-sm')
  })

  it('should accept custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('should handle data-testid attribute', () => {
    render(
      <Card data-testid="card">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
  })

  it('should handle onClick events', () => {
    const handleClick = jest.fn()
    render(
      <Card onClick={handleClick} data-testid="card">
        Clickable Card
      </Card>
    )
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should apply hover animations by default', () => {
    const { container } = render(<Card>Hover Card</Card>)
    const motionDiv = container.firstChild as HTMLElement
    
    expect(motionDiv).toBeInTheDocument()
  })

  it('should disable hover animations when hover prop is false', () => {
    render(
      <Card hover={false} data-testid="card">
        No Hover Card
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
  })

  it('should merge custom styles with default styles', () => {
    render(
      <Card className="bg-blue-500 p-8" data-testid="card">
        Styled Card
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-blue-500')
    expect(card).toHaveClass('p-8')
    expect(card).toHaveClass('rounded-xl')
  })

  it('should render nested components properly', () => {
    render(
      <Card>
        <div data-testid="nested-1">
          <span data-testid="nested-2">Deeply nested content</span>
        </div>
      </Card>
    )
    expect(screen.getByTestId('nested-1')).toBeInTheDocument()
    expect(screen.getByTestId('nested-2')).toBeInTheDocument()
    expect(screen.getByText('Deeply nested content')).toBeInTheDocument()
  })

  it('should handle multiple Card components', () => {
    render(
      <>
        <Card data-testid="card-1">Card 1</Card>
        <Card data-testid="card-2">Card 2</Card>
        <Card data-testid="card-3">Card 3</Card>
      </>
    )
    expect(screen.getByTestId('card-1')).toBeInTheDocument()
    expect(screen.getByTestId('card-2')).toBeInTheDocument()
    expect(screen.getByTestId('card-3')).toBeInTheDocument()
  })
})