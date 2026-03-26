import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function CookiePolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="section-padding max-w-3xl mx-auto py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-orange-700 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Cookie Policy
        </h1>
        <p className="text-sm text-stone-400 mb-10">Ultimo aggiornamento: Marzo 2026</p>

        <div className="text-sm text-stone-600 leading-relaxed space-y-8">

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">1. Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file di testo che i siti visitati inviano al terminale dell'utente, 
              dove vengono memorizzati, per poi essere ritrasmessi agli stessi siti alla visita successiva. 
              Grazie ai cookie un sito ricorda le azioni e preferenze dell'utente.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">2. Tipologie di cookie utilizzate</h2>

            <div className="overflow-x-auto -mx-2">
              <table className="w-full min-w-[540px] text-xs border border-stone-200 rounded-sm">
                <thead>
                  <tr className="bg-stone-50">
                    <th className="text-left px-4 py-3 text-stone-700 font-semibold border-b border-stone-200">Nome</th>
                    <th className="text-left px-4 py-3 text-stone-700 font-semibold border-b border-stone-200">Tipo</th>
                    <th className="text-left px-4 py-3 text-stone-700 font-semibold border-b border-stone-200">Finalità</th>
                    <th className="text-left px-4 py-3 text-stone-700 font-semibold border-b border-stone-200">Durata</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'tf_cookie_consent', type: 'Tecnico (localStorage)', purpose: 'Memorizza le preferenze cookie dell\'utente', duration: 'Persistente (1 anno)' },
                    { name: 'Sessione browser', type: 'Tecnico', purpose: 'Necessario per la navigazione nel sito', duration: 'Sessione' },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-stone-50'}>
                      <td className="px-4 py-3 font-mono text-orange-700 border-b border-stone-100">{row.name}</td>
                      <td className="px-4 py-3 border-b border-stone-100">{row.type}</td>
                      <td className="px-4 py-3 border-b border-stone-100">{row.purpose}</td>
                      <td className="px-4 py-3 border-b border-stone-100">{row.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 p-4 bg-stone-50 rounded-sm border border-stone-200">
              <p className="text-xs text-stone-500">
                <strong className="text-stone-700">Nota:</strong> Questo sito non utilizza cookie di profilazione 
                o marketing di terze parti. I cookie analitici, se accettati, potrebbero essere aggiunti 
                in futuro previa aggiornamento di questa policy e nuovo consenso dell'utente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">3. Cookie di terze parti</h2>
            <p>
              Alcune sezioni del sito incorporano servizi di terze parti che possono impostare i propri cookie:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                <strong>Google Maps:</strong> utilizzato per mostrare la mappa della sede. 
                Potrebbe impostare cookie secondo la{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                  className="underline hover:text-orange-700 transition-colors">
                  Privacy Policy di Google
                </a>.
              </li>
              <li>
                <strong>WhatsApp (Meta):</strong> i link di contatto WhatsApp aprono l'app o il sito di WhatsApp, 
                soggetto alla propria{' '}
                <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
                  className="underline hover:text-orange-700 transition-colors">
                  Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">4. Come gestire i cookie</h2>
            <p>
              Puoi gestire le preferenze cookie direttamente tramite il banner presente nel sito, 
              oppure attraverso le impostazioni del tuo browser. Tieni presente che disabilitare 
              i cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { name: 'Firefox', url: 'https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata' },
                { name: 'Safari', url: 'https://support.apple.com/it-it/guide/safari/sfri11471' },
                { name: 'Edge', url: 'https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge' },
              ].map(b => (
                <a key={b.name} href={b.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-stone-500 hover:text-orange-700 border border-stone-200 hover:border-orange-700 rounded-sm px-3 py-2 transition-colors">
                  → Impostazioni cookie {b.name}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">5. Revoca del consenso</h2>
            <p>
              Puoi revocare il consenso in qualsiasi momento cliccando il pulsante qui sotto, 
              che ripristinerà il banner di consenso:
            </p>
            <button
              onClick={() => { localStorage.removeItem('tf_cookie_consent'); window.location.reload() }}
              className="mt-4 text-sm font-semibold border border-orange-700 text-orange-700 hover:bg-orange-700 hover:text-white px-5 py-2.5 rounded-sm transition-colors"
            >
              Reimposta preferenze cookie
            </button>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">6. Contatti</h2>
            <p>
              Per qualsiasi domanda relativa ai cookie o alla privacy contatta:<br />
              <strong>Termoricambi</strong> — Via L. Albenavolo, 81057 Teano (CE)<br />
              P.IVA: 04694560618 · Tel: 329 219 7867 · 0823 657232
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
