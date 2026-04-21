import { contactSchema } from '@/app/lib/schemas/contact'
import { Resend } from 'resend'

const CONTACT_FROM = process.env.CONTACT_FROM_ADDRESS ?? 'Portfolio <onboarding@resend.dev>'
const CONTACT_TO = process.env.CONTACT_TO_ADDRESS ?? 'mujeeburahman4582@gmail.com'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot — silently accept before running strict validation so bots never see an error shape.
  if (
    typeof body === 'object' &&
    body !== null &&
    '_trap' in body &&
    Boolean((body as { _trap?: unknown })._trap)
  ) {
    return Response.json({ ok: true })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed' }, { status: 400 })
  }

  const { name, email, message } = parsed.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact route] RESEND_API_KEY is not configured')
    return Response.json({ error: 'Email service unavailable' }, { status: 503 })
  }

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    if (error) {
      console.error('[contact route] Resend error:', error)
      return Response.json({ error: 'Failed to send' }, { status: 500 })
    }

    return Response.json({ ok: true, id: data?.id })
  } catch (err) {
    console.error('[contact route] Resend request failed:', err)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }
}
