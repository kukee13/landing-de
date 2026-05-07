import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung — Landing.de',
}

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Link href="/" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900">
          ← Back to Landing.de
        </Link>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">Datenschutzerklärung</h1>
        <p className="mb-8 text-sm text-gray-500">Privacy Policy</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">1. Data Controller</h2>
            <p>
              Kartik Chauhan, kartikchauhanofficial@gmail.com (see <Link href="/impressum" className="underline">Impressum</Link>).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">2. What data we collect</h2>
            <p className="mb-3">
              Landing.de is designed to collect as little data as possible:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong>No account, no registration.</strong> We do not collect your name, email address,
                or any personal details unless you voluntarily submit them via the optional reminder form.
              </li>
              <li>
                <strong>localStorage only.</strong> Your checklist answers (city, visa type, arrival date,
                country of origin) and task progress are stored exclusively in your browser's localStorage.
                This data never leaves your device and is not transmitted to our servers.
              </li>
              <li>
                <strong>Anonymous analytics.</strong> We use Vercel Analytics to collect anonymous,
                aggregated page-view data (pages visited, referrer, browser type). No cookies are set.
                No personal identifiers are collected or stored.
              </li>
              <li>
                <strong>Optional email reminders.</strong> If you provide your email address to receive
                a checklist reminder, that address is used solely to send the single email and is not
                stored or shared with third parties.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">3. Legal basis (GDPR Art. 6)</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li>Analytics: Art. 6(1)(f) — legitimate interest in understanding how the service is used</li>
              <li>Email reminders: Art. 6(1)(a) — your explicit consent at the point of submission</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">4. Third-party services</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm">
              <li>
                <strong>Vercel</strong> (hosting and analytics) — servers in the EU/USA.
                Privacy policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline">vercel.com/legal/privacy-policy</a>
              </li>
              <li>
                <strong>Resend</strong> (transactional email, only if you request a reminder) —
                Privacy policy: <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">resend.com/privacy</a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">5. Cookies</h2>
            <p className="text-sm">
              Landing.de does not use cookies. Vercel Analytics operates without cookies using
              anonymous edge-level data only.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">6. Your rights (GDPR)</h2>
            <p className="text-sm">
              You have the right to access, rectify, erase, and port any personal data we hold about
              you, and to object to or restrict processing. Since we hold no personal data about you
              on our servers (all data is in your browser), the practical exercise of these rights is
              through your browser's localStorage settings. For email-related enquiries, contact
              us at kartikchauhanofficial@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">7. Data retention</h2>
            <p className="text-sm">
              localStorage data is retained until you clear your browser data. We do not retain
              any server-side data. Email addresses submitted for reminders are deleted immediately
              after the email is sent.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-gray-900">8. Contact & complaints</h2>
            <p className="text-sm">
              For privacy-related questions: kartikchauhanofficial@gmail.com. You also have the
              right to lodge a complaint with your local data protection authority.
            </p>
          </section>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          Stand: Mai 2026 · <Link href="/impressum" className="underline">Impressum</Link>
        </p>
      </div>
    </div>
  )
}
