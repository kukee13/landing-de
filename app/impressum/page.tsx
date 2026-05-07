import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum — Landing.de',
}

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16">
        <Link href="/" className="mb-8 inline-block text-sm text-gray-500 hover:text-gray-900">
          ← Back to Landing.de
        </Link>

        <h1 className="mb-8 text-3xl font-bold text-gray-900">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">Angaben gemäß § 5 TMG</h2>
            <p className="mt-2">
              Kartik Chauhan<br />
              [Your Street Address]<br />
              [Postcode] [City], Germany
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Kontakt</h2>
            <p className="mt-2">
              E-Mail:{' '}
              <a href="mailto:kartikchauhanofficial@gmail.com" className="underline">
                kartikchauhanofficial@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="mt-2">
              Kartik Chauhan<br />
              [Your Street Address]<br />
              [Postcode] [City], Germany
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Haftungsausschluss</h2>
            <p className="mt-2">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die
              Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine
              Gewähr. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf
              diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
            <p className="mt-2">
              The task information on Landing.de is provided for general guidance only. Laws and
              administrative procedures change frequently. Always verify requirements with the
              relevant German authorities before taking action.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Externe Links</h2>
            <p className="mt-2">
              Diese Website enthält Links zu externen Websites Dritter. Auf die Inhalte dieser
              Seiten haben wir keinen Einfluss und übernehmen daher keine Gewähr für die Inhalte
              externer Links.
            </p>
          </section>
        </div>

        <p className="mt-12 text-xs text-gray-400">
          Stand: Mai 2026 · <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>
        </p>
      </div>
    </div>
  )
}
