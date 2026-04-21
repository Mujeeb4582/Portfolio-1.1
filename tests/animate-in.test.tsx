import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AnimateIn, StaggerChildren, StaggerItem } from '@/app/ui/animate-in'

describe('AnimateIn', () => {
  it('ANIM-01: renders children', () => {
    render(<AnimateIn><span>hello</span></AnimateIn>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('ANIM-01: accepts delay and className props without error', () => {
    render(<AnimateIn delay={0.2} className="my-class"><span>content</span></AnimateIn>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})

describe('StaggerChildren', () => {
  it('ANIM-01: renders children', () => {
    render(
      <StaggerChildren>
        <StaggerItem><span>item</span></StaggerItem>
      </StaggerChildren>
    )
    expect(screen.getByText('item')).toBeInTheDocument()
  })
})
