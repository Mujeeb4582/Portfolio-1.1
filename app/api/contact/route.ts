import { contactSchema } from '@/app/lib/schemas/contact'
import { Resend } from 'resend'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: 'Validation failed' }, { status: 400 })
  }

  const { name, email, message, _trap } = parsed.data

  // Honeypot — silent reject
  if (_trap) {
    return Response.json({ ok: true })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to: ['mujeeburahman4582@gmail.com'],
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  })

  if (error) {
    console.error('[contact route] Resend error:', error)
    return Response.json({ error: 'Failed to send' }, { status: 500 })
  }

  return Response.json({ ok: true, id: data?.id })
}
