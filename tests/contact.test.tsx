import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { contactSchema } from '@/app/lib/schemas/contact'
// ContactSection is a stub (returns null) in Plan 01 — RED phase.
// Plan 02 will implement the real component and turn these tests GREEN.
import ContactSection from '@/app/ui/homepage/contactSection'

// -------------------------------------------------------------------------
// contactSchema — unit tests (GREEN once schema file exists)
// -------------------------------------------------------------------------

describe('contactSchema', () => {
  it('fails with empty name (min 2 chars)', () => {
    const result = contactSchema.safeParse({
      name: '',
      email: 'test@example.com',
      message: 'Hello this is a test message',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const nameError = result.error.issues.find((i) => i.path[0] === 'name')
      expect(nameError?.message).toBe('Name must be at least 2 characters')
    }
  })

  it('fails with invalid email', () => {
    const result = contactSchema.safeParse({
      name: 'Mujeeb',
      email: 'not-an-email',
      message: 'Hello this is a test message',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((i) => i.path[0] === 'email')
      expect(emailError?.message).toBe('Please enter a valid email address')
    }
  })

  it('fails with message shorter than 10 characters', () => {
    const result = contactSchema.safeParse({
      name: 'Mujeeb',
      email: 'test@example.com',
      message: 'Short',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const msgError = result.error.issues.find((i) => i.path[0] === 'message')
      expect(msgError?.message).toBe('Message must be at least 10 characters')
    }
  })

  it('passes with valid name, email, and message', () => {
    const result = contactSchema.safeParse({
      name: 'Mujeeb',
      email: 'test@example.com',
      message: 'Hello, I would like to get in touch with you.',
    })
    expect(result.success).toBe(true)
  })

  it('fails when _trap honeypot field is filled', () => {
    const result = contactSchema.safeParse({
      name: 'Mujeeb',
      email: 'test@example.com',
      message: 'Hello, this is a legitimate message.',
      _trap: 'filled by bot',
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const trapError = result.error.issues.find((i) => i.path[0] === '_trap')
      expect(trapError?.message).toBe('Bot detected')
    }
  })
})

// -------------------------------------------------------------------------
// ContactSection component tests — RED phase (ContactSection does not exist yet)
// -------------------------------------------------------------------------

describe('CONT-01: Contact form renders required fields', () => {
  it('renders name input, email input, message textarea, and submit button', () => {
    render(<ContactSection />)
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })
})

describe('CONT-02: Contact form shows validation errors on empty submit', () => {
  it('shows name, email, and message errors when form is submitted empty', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)

    const submitButton = screen.getByRole('button', { name: /send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(
        screen.getByText('Name must be at least 2 characters')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Message must be at least 10 characters')
      ).toBeInTheDocument()
    })
  })
})

describe('CONT-03: Contact form submits to /api/contact', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('POSTs to /api/contact with name, email, message payload on valid submit', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Mujeeb')
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    )
    await user.type(
      screen.getByRole('textbox', { name: /message/i }),
      'Hello, I would like to get in touch with you.'
    )
    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Mujeeb',
          email: 'test@example.com',
          message: 'Hello, I would like to get in touch with you.',
        }),
      })
    })
  })
})

describe('CONT-04: Contact form shows success or error feedback', () => {
  it('shows success message when fetch returns ok=true', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ message: 'Email sent successfully' }),
      })
    )
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Mujeeb')
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    )
    await user.type(
      screen.getByRole('textbox', { name: /message/i }),
      'Hello, I would like to get in touch with you.'
    )
    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })

  it('shows error message when fetch returns ok=false', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ error: 'Failed to send' }),
      })
    )
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'Mujeeb')
    await user.type(
      screen.getByRole('textbox', { name: /email/i }),
      'test@example.com'
    )
    await user.type(
      screen.getByRole('textbox', { name: /message/i }),
      'Hello, I would like to get in touch with you.'
    )
    await user.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })

    vi.unstubAllGlobals()
  })
})

describe('CONT-05: Contact section renders contact links', () => {
  it('renders email, WhatsApp, LinkedIn, and GitHub links', () => {
    render(<ContactSection />)

    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:mujeeburahman4582@gmail.com'
    )

    const whatsAppLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(whatsAppLink.getAttribute('href')).toMatch(/wa\.me/)

    const linkedInLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedInLink.getAttribute('href')).toMatch(/linkedin\.com/)

    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink.getAttribute('href')).toMatch(/github\.com/)
  })
})
