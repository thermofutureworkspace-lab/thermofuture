import { ArrowRight, Check } from 'lucide-react'

const points = [
  'Resa cromatica termica di alta qualità, zero composti tossici',
  'Resistente a raggi UV, salsedine e variazioni termiche estreme',
  'Nano-finitura a base acqua che respinge polvere e umidità',
  'Mantiene la brillantezza visiva per oltre 30 anni',
  'Conforme agli standard EU net-zero per l\'edilizia verde',
]

export default function Technology() {
  return (
    <section id="technology" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">

        {/* Left: text */}
        <div className="flex items-center py-20 px-8 sm:px-14 lg:px-16 order-2 lg:order-1">
          <div className="max-w-lg">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-widest uppercase mb-6">
              <span className="w-6 h-px bg-orange-500" />
              La finitura eco-sostenibile
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-5">
              Il colore <em>eco-sostenibile</em>
            </h2>
            <p className="text-base text-stone-500 leading-relaxed mb-5">
              ThermoFuture utilizza <strong className="text-stone-800">THERM&amp;GREEN</strong>,
              una speciale finitura nano a base acqua completamente non tossica.
              Offre eccezionale resa cromatica, resistenza UV e brillantezza duratura —
              perfettamente in linea con la filosofia dell'energia verde.
            </p>
            <p className="text-base font-semibold text-stone-800 mb-8">
              Il risultato? Una superficie esteticamente impeccabile che si integra
              nell'ecosistema.
            </p>

            <ul className="space-y-3 mb-10">
              {points.map(p => (
                <li key={p} className="flex items-start gap-3 text-sm text-stone-500">
                  <Check className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href="#contacts"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3.5 rounded-sm text-sm transition-colors group"
            >
              Richiedi un campione
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Stat grid */}
            <div className="mt-12 grid grid-cols-2 gap-px bg-stone-200 rounded-sm overflow-hidden">
              {[
                { value: 'A+', label: 'Resistenza UV' },
                { value: '30+', label: 'Anni garanzia' },
                { value: '82%', label: 'CO₂ risparmiata' },
                { value: '5★', label: 'Rating termico' },
              ].map(item => (
                <div key={item.label} className="bg-white p-6">
                  <div className="text-3xl font-black text-stone-900">{item.value}</div>
                  <div className="text-xs text-stone-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[400px] lg:min-h-full order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1000&q=85"
            alt="Tecnologia THERM&GREEN"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
          {/* Floating badge */}
          <div className="absolute top-10 left-10 bg-orange-600 text-white px-5 py-3 rounded-sm shadow-xl">
            <div className="text-xs font-bold tracking-widest uppercase mb-0.5">Tecnologia</div>
            <div className="text-xl font-black">THERM&amp;GREEN™</div>
          </div>
        </div>

      </div>
    </section>
  )
}
