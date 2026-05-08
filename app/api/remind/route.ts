
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

    const PRIORITY_COLOR: Record<string, string> = {
      critical: '#dc2626',
      high: '#d97706',
      medium: '#2563eb',
      low: '#6b7280',
    }

    const CITY_LABEL: Record<string, string> = {
      berlin: 'Berlin', munich: 'Munich', frankfurt: 'Frankfurt',
      hamburg: 'Hamburg', cologne: 'Cologne', other: 'Germany',
    }

    const VISA_LABEL: Record<string, string> = {
      student: 'Student Visa', 'blue-card': 'EU Blue Card',
      chancenkarte: 'Chancenkarte', 'job-seeker': 'Job Seeker',
      'family-reunion': 'Family Reunion',
    }

    const taskRows = tasks
      .map((t: { title: string; deadline: string | null; priority: string }) => {
        const dot = PRIORITY_COLOR[t.priority] ?? '#6b7280'
        const isOverdue = t.deadline && new Date(t.deadline) < new Date()
        const deadlineColor = isOverdue ? '#dc2626' : '#6b7280'
        return `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:middle">
              <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${dot};margin-right:10px;vertical-align:middle"></span>
              <span style="font-size:14px;font-weight:500;color:#111827;vertical-align:middle">${t.title}</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;text-align:right;vertical-align:middle;white-space:nowrap">
              <span style="font-size:13px;color:${deadlineColor}">${t.deadline ?? '<span style="color:#9ca3af">Flexible</span>'}</span>
            </td>
          </tr>`
      })
      .join('')

    const cityLabel = CITY_LABEL[profile.city] ?? profile.city
    const visaLabel = VISA_LABEL[profile.visaType] ?? profile.visaType
    const arrivalFormatted = new Date(profile.arrivalDate).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    })
    const criticalCount = tasks.filter((t: { priority: string }) => t.priority === 'critical').length
    const siteUrl = 'https://landing-de-brown.vercel.app'

    await resend.emails.send({
      from: 'Landing.de <noreply@landing-de.vercel.app>',
      to: email,
      subject: `Your Germany checklist — ${tasks.length} tasks, ${criticalCount} critical`,
      html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

        <!-- Header bar -->
        <tr>
          <td style="background:#000;border-radius:12px 12px 0 0;padding:24px 32px">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.5px">Landing.de</span>
                  <span style="font-size:13px;color:#9ca3af;margin-left:8px">Your first 90 days, sorted.</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Yellow accent stripe -->
        <tr>
          <td style="background:#facc15;height:4px;line-height:4px;font-size:0">&nbsp;</td>
        </tr>

        <!-- Body card -->
        <tr>
          <td style="background:#fff;border-radius:0 0 12px 12px;padding:32px 32px 24px">

            <!-- Greeting -->
            <p style="margin:0 0 6px;font-size:22px;font-weight:700;color:#111827">Your Germany Checklist</p>
            <p style="margin:0 0 24px;font-size:14px;color:#6b7280">${cityLabel} &nbsp;·&nbsp; ${visaLabel} &nbsp;·&nbsp; Arriving ${arrivalFormatted}</p>

            <!-- Stats pills -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:24px">
              <tr>
                <td style="background:#f3f4f6;border-radius:20px;padding:6px 14px;margin-right:8px">
                  <span style="font-size:13px;font-weight:600;color:#111827">${tasks.length}</span>
                  <span style="font-size:13px;color:#6b7280"> total tasks</span>
                </td>
                <td style="width:8px"></td>
                <td style="background:#fef2f2;border-radius:20px;padding:6px 14px">
                  <span style="font-size:13px;font-weight:600;color:#dc2626">${criticalCount}</span>
                  <span style="font-size:13px;color:#dc2626"> critical</span>
                </td>
              </tr>
            </table>

            <!-- Priority legend -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:16px">
              <tr>
                <td style="font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;padding-right:16px">Priority</td>
                <td style="padding-right:12px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#dc2626;margin-right:4px;vertical-align:middle"></span><span style="font-size:12px;color:#6b7280">Critical</span></td>
                <td style="padding-right:12px"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#d97706;margin-right:4px;vertical-align:middle"></span><span style="font-size:12px;color:#6b7280">High</span></td>
                <td><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#2563eb;margin-right:4px;vertical-align:middle"></span><span style="font-size:12px;color:#6b7280">Medium</span></td>
              </tr>
            </table>

            <!-- Task table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              <thead>
                <tr style="border-bottom:2px solid #e5e7eb">
                  <th style="text-align:left;padding-bottom:10px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Task</th>
                  <th style="text-align:right;padding-bottom:10px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.05em;font-weight:600">Due date</th>
                </tr>
              </thead>
              <tbody>${taskRows}</tbody>
            </table>

            <!-- CTA button -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px">
              <tr>
                <td align="center">
                  <a href="${siteUrl}" style="display:inline-block;background:#000;color:#fff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px">
                    Open my checklist →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 0 8px;text-align:center">
            <p style="margin:0;font-size:12px;color:#9ca3af">
              This email was sent once at your request. Your address is not stored.
            </p>
            <p style="margin:4px 0 0;font-size:12px;color:#9ca3af">
              Task information is for guidance only — always verify with official sources.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
