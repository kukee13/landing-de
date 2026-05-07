import { NextRequest, NextResponse } from 'next/server'

// Affiliate / sponsor redirect tracker.
// Usage: GET /api/track?id=n26&type=affiliate&dest=https://n26.com/...
// → logs the click, returns a redirect to `dest`.
// Replace console.log with your preferred analytics sink (Plausible events, PostHog, etc.)
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') ?? 'unknown'
  const type = req.nextUrl.searchParams.get('type') ?? 'affiliate'
  const dest = req.nextUrl.searchParams.get('dest')

  if (!dest) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Validate dest is a real URL (prevent open redirect abuse)
  let destUrl: URL
  try {
    destUrl = new URL(dest)
    if (!['http:', 'https:'].includes(destUrl.protocol)) throw new Error()
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }

  console.log(`[track] ${new Date().toISOString()} type=${type} id=${id} dest=${destUrl.hostname}`)

  return NextResponse.redirect(destUrl.toString())
}
