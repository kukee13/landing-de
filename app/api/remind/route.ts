
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 503 })
  }
  const resend = new Resend(apiKey)

  try {
    const { email, tasks, profile } = await req.json()

    if (!email || !tasks?.length) {
      return NextResponse.json({ error: 'Missing email or tasks' }, { status: 400 })
    }

    const taskRows = tasks
      .map(
        (t: { title: string; deadline: string | null; priority: string }) =>
          `<tr style="border-bottom:1px solid #f0f0f0">
            <td style="padding:10px 0;font-weight:500">${t.title}</td>
            <td style="padding:10px 0;color:#6b7280;text-align:right">${t.deadline ?? 'Flexible'}</td>
          </tr>`
      )
      .join('')

    await resend.emails.send({
      from: 'Landing.de <noreply@landing-de.vercel.app>',
      to: email,
      subject: 'Your Germany checklist — tasks and deadlines',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px 16px">
          <h1 style="font-size:24px;font-weight:700;margin-bottom:4px">Your Germany Checklist</h1>
          <p style="color:#6b7280;margin-bottom:24px">
            ${profile.city} · ${profile.visaType} · arriving ${profile.arrivalDate}
          </p>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:2px solid #e5e7eb">
                <th style="text-align:left;padding-bottom:8px;font-size:12px;color:#9ca3af;text-transform:uppercase">Task</th>
                <th style="text-align:right;padding-bottom:8px;font-size:12px;color:#9ca3af;text-transform:uppercase">Due date</th>
              </tr>
            </thead>
            <tbody>${taskRows}</tbody>
          </table>
          <p style="margin-top:32px;font-size:12px;color:#9ca3af">
            Open your checklist: <a href="https://landing-de-brown.vercel.app">landing-de-brown.vercel.app</a>
            · This email was sent once and your address is not stored.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
