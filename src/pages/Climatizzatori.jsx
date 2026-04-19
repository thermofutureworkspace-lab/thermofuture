import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const WA_BASE = 'https://wa.me/393292197867?text='

/** Dati tecnici sintetizzati dalla documentazione commerciale Aircon (partner). */
const products = [
  {
    slug: 'john',
    name: 'John Monosplit',
    subtitle: 'Climatizzatore a parete · pompa di calore DC-Inverter',
    image: 'https://www.air-con.it/wp-content/uploads/2024/06/JOHN-MONOSPLIT.webp',
    highlights: [
      'Raffrescamento senza effetto vento con modalità Gentle Breeze (fino a 1.422 microfori).',
      'Facile da pulire: filtro, pale, piastra e serranda smontabili.',
      'Modalità Eco per consumi contenuti mantenendo il comfort.',
      'Compressore ad alta frequenza: comfort rapido (es. 30 s verso 18 °C / 60 s verso 40 °C).',
    ],
    functions: [
      'Controllo WiFi IoT',
      'Smart Inverter · I FEEL · Flusso d’aria Smart',
      'Timer 24H · Autodiagnosi · Riavvio automatico',
    ],
    waMessage:
      'Ciao,%20vorrei%20informazioni%20e%20un%20preventivo%20per%20il%20climatizzatore%20John%20Monosplit%20Aircon.',
    specIntro:
      'R32 · alimentazione 220-240 V~/50 Hz/1P · valori indicativi per confronto tra taglie (manuale d’uso e listino aggiornano eventuali revisioni).',
    specColumns: ['Modello', 'Btu/h', 'Raffresc. (W)', 'Riscald. (W)', 'SEER', 'SCOP', 'Classe raffr.', 'Classe risc.'],
    specRows: [
      ['JOHN09 / Y24', '9.000', '2600 (940~3300)', '2630 (940~3360)', '6,3', '4,0', 'A++', 'A+'],
      ['JOHN12 / Y24', '12.000', '3400 (1000~3770)', '3430 (1000~3810)', '6,1', '4,0', 'A++', 'A+'],
      ['JOHN18 / Y24', '18.000', '5100 (1250~5900)', '5130 (1250~6080)', '6,1', '4,0', 'A++', 'A+'],
      ['JOHN24 / Y24', '24.000', '6840 (1830~7820)', '7050 (1850~7960)', '6,5', '4,0', 'A++', 'A+'],
    ],
    specNotes: [
      'EER / COP dichiarati: 3,24 · 3,71 (linea)',
      'Esempio energia annua dichiarata (kWh/a): raffrescamento da 144 a 366 · riscaldamento da 735 a 1995 (varia per taglia)',
    ],
  },
  {
    slug: 'valery-monosplit',
    name: 'Valery Monosplit',
    subtitle: 'Climatizzatore a parete · pompa di calore DC-Inverter',
    image: 'https://www.air-con.it/wp-content/uploads/2024/06/VALERY-MONOSPLIT.webp',
    highlights: [
      'Aletta microforata e Gentle Breeze per flusso laminare e comfort.',
      'Controllo WiFi incluso: app e comandi vocali (smartphone, Smart TV o Alexa soundbar tramite Google Assistant).',
      'Deep Clean, filtro HEPA e molte funzioni dedicate al benessere.',
    ],
    functions: [
      '14 modalità Sleep · Flusso d’aria 3D · Climi estremi',
      'Modalità Eco · Smart Inverter · Promemoria pulizia filtro',
      'Deumidificazione · Timer 24H · Autodiagnosi',
    ],
    waMessage:
      'Ciao,%20vorrei%20informazioni%20e%20un%20preventivo%20per%20il%20climatizzatore%20Valery%20Monosplit%20Aircon.',
    specIntro:
      'R32 · alimentazione 220-240 V~/50 Hz/1P · classe energetica elevata in raffrescamento (A+++).',
    specColumns: ['Modello', 'Btu/h', 'Raffresc. (W)', 'Riscald. (W)', 'SEER', 'SCOP', 'Classe raffr.', 'Classe risc.'],
    specRows: [
      ['VALERY09 / Y24', '9.000', '2610 (940~3700)', '3000 (940~4000)', '8,5', '4,6', 'A+++', 'A++'],
      ['VALERY12 / Y24', '12.000', '3510 (1000~4600)', '3800 (1000~4900)', '8,5', '4,6', 'A+++', 'A++'],
    ],
    specNotes: [
      'EER / COP dichiarati: es. 3,7 / 4,1 (9K) e 3,5 / 3,9 (12K)',
      'Energia annua dichiarata (kWh/a): raffrescamento 108 · 145; riscaldamento 625 · 825',
      'Deumidificazione: 1,0 · 1,2 l/h · pressioni sonore interne da tabella installazione',
    ],
  },
]

function SpecTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full min-w-[640px] text-sm border-collapse">
        <thead>
          <tr className="border-b border-stone-200 bg-stone-50 text-left text-xs font-semibold uppercase tracking-wide text-stone-500">
            {columns.map((col) => (
              <th key={col} className="py-3 px-2 first:pl-3 last:pr-3 whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-stone-100 hover:bg-orange-50/40">
              {row.map((cell, j) => (
                <td key={j} className="py-2.5 px-2 first:pl-3 last:pr-3 text-stone-700 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Climatizzatori() {
  return (
    <main className="pt-24 pb-20 bg-stone-50 min-h-screen">
      <div className="section-padding max-w-7xl mx-auto">
        <nav className="text-sm text-stone-500 mb-8">
          <Link to="/" className="hover:text-orange-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-stone-800 font-medium">Climatizzatori Aircon</span>
        </nav>

        <div className="mb-12 max-w-3xl">
          <div className="section-tag">
            <span className="w-6 h-px bg-orange-700" />
            Pompa di calore · DC-Inverter
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Climatizzatori <em className="text-orange-700 not-italic">Aircon</em>
          </h1>
          <p className="mt-4 text-stone-600 leading-relaxed">
            ThermoFuture è partner Aircon: sotto trovi schede prodotto con dati tecnici e varianti in
            listino. Per listini aggiornati, combinazioni d&apos;installazione o sopralluogo richiedi un
            preventivo: ti rispondiamo su WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:gap-20">
          {products.map((p, idx) => (
            <article
              key={p.slug}
              className="bg-white rounded-sm shadow-sm border border-stone-100 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative bg-neutral-100 aspect-[4/3] lg:aspect-auto lg:min-h-[320px]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-contain p-6 lg:p-10"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>

                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <p className="text-xs font-bold tracking-widest text-orange-700 uppercase mb-2">
                    Linea residenziale
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                    {p.name}
                  </h2>
                  <p className="text-sm text-stone-500 mb-6">{p.subtitle}</p>

                  <ul className="space-y-3 mb-6">
                    {p.highlights.map((line) => (
                      <li key={line} className="text-sm text-stone-700 leading-relaxed flex gap-2">
                        <span className="text-orange-600 shrink-0 mt-1">·</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    Funzioni principali
                  </p>
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {p.functions.map((f) => (
                      <li
                        key={f}
                        className="text-xs px-2.5 py-1 rounded-sm bg-stone-100 text-stone-600"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={WA_BASE + p.waMessage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center w-full sm:w-fit"
                  >
                    Informazioni e preventivo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="border-t border-stone-100 bg-stone-50/80 px-6 py-8 lg:px-10 lg:py-10">
                <h3 className="font-display text-xl font-bold text-stone-900 mb-2">
                  Scheda tecnica
                </h3>
                <p className="text-sm text-stone-600 mb-6 max-w-3xl">{p.specIntro}</p>
                <SpecTable columns={p.specColumns} rows={p.specRows} />
                <ul className="mt-6 space-y-2 text-xs text-stone-500 max-w-3xl">
                  {p.specNotes.map((n) => (
                    <li key={n}>· {n}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-14 text-xs text-stone-400 max-w-2xl leading-relaxed">
          Marchio registrato Aircon. Schede e prestazioni con riferimento ai dati commerciali del
          produttore; in fase di preventivo confermiamo taglia, optional e voci di installazione sul
          tuo impianto.
        </p>
      </div>
    </main>
  )
}
