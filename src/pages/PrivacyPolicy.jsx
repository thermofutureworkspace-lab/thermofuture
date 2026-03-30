import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="section-padding max-w-3xl mx-auto py-24">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-orange-700 transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          Torna alla home
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-400 mb-10">Ultimo aggiornamento: Marzo 2026</p>

        <div className="prose prose-stone max-w-none text-sm text-stone-600 leading-relaxed space-y-8">

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">1. Titolare del trattamento</h2>
            <p>
              Il titolare del trattamento dei dati personali è:<br />
              <strong>Termoricambi</strong><br />
              Via L. Albenavolo, 81057 Teano (CE)<br />
              P.IVA: 04694560618<br />
              Telefono: 329 219 7867 · 0823 657232<br />
              Email: info@thermofuture.it
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">2. Tipologie di dati raccolti</h2>
            <p>
              Il presente sito raccoglie le seguenti tipologie di dati:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Dati di navigazione:</strong> indirizzi IP, indirizzi URL, orari delle richieste, metodo HTTP, dimensione del file ricevuto, codice numerico indicante lo stato della risposta dal server.</li>
              <li><strong>Dati comunicati volontariamente:</strong> dati forniti dall'utente attraverso i canali di contatto (WhatsApp, telefono, email).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">3. Finalità e base giuridica del trattamento</h2>
            <p>I dati personali sono trattati per le seguenti finalità:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Erogazione del servizio:</strong> rispondere a richieste di informazioni e preventivi (art. 6(1)(b) GDPR).</li>
              <li><strong>Adempimenti legali:</strong> obblighi di legge, fiscali e contabili (art. 6(1)(c) GDPR).</li>
              <li><strong>Legittimo interesse:</strong> sicurezza del sito e prevenzione di frodi (art. 6(1)(f) GDPR).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">4. Conservazione dei dati</h2>
            <p>
              I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti.
              I dati di navigazione non sono conservati oltre i 30 giorni. I dati relativi ai contratti sono conservati
              per 10 anni in ottemperanza agli obblighi fiscali e contabili.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">5. Comunicazione e diffusione dei dati</h2>
            <p>
              I dati personali non sono ceduti a terzi per finalità di marketing. I dati possono essere comunicati a:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Fornitori di servizi tecnici (hosting, gestione del sito) nel rispetto del GDPR.</li>
              <li>Autorità pubbliche quando previsto dalla legge.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">6. Diritti dell'interessato</h2>
            <p>L'utente ha diritto di:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Accedere ai propri dati personali (art. 15 GDPR)</li>
              <li>Richiedere la rettifica dei dati (art. 16 GDPR)</li>
              <li>Richiedere la cancellazione dei dati (art. 17 GDPR)</li>
              <li>Limitare il trattamento (art. 18 GDPR)</li>
              <li>Opporsi al trattamento (art. 21 GDPR)</li>
              <li>Proporre reclamo al Garante per la Protezione dei Dati Personali (www.garanteprivacy.it)</li>
            </ul>
            <p className="mt-3">
              Per esercitare i propri diritti, contattare: <strong>info@thermofuture.eu</strong>, al numero <strong>329 219 7867</strong> oppure <strong>0823 657232</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">7. Link a siti terzi</h2>
            <p>
              Il sito può contenere link a siti di terze parti (es. Google Maps, WhatsApp). 
              Il titolare non è responsabile delle politiche di privacy di tali siti.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-stone-900 mb-3">8. Modifiche alla privacy policy</h2>
            <p>
              Il titolare si riserva il diritto di modificare la presente policy. 
              Le modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
