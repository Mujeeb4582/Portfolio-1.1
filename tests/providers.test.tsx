import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ClientThemeProvider } from '@/app/ui/theme/clientThemeProvider'

describe('ClientThemeProvider', () => {
  it('ANIM-03: renders children without error', () => {
    const { getByText } = render(
      <ClientThemeProvider>
        <span>child</span>
      </ClientThemeProvider>
    )
    expect(getByText('child')).toBeInTheDocument()
  })
})
