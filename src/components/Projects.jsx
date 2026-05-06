import { ArrowRight, MessageCircle } from 'lucide-react'
import CallPicker from './CallPicker'

const WA = 'https://wa.me/393292197867?text=Ciao,%20ho%20visto%20i%20vostri%20lavori%20e%20vorrei%20un%20preventivo'

const projects = [
  { img: '/assets/proj-solar-1.png',       category: 'Fotovoltaico',    title: 'Impianto fotovoltaico residenziale',          location: 'Teano, CE' },
  { img: '/assets/proj-solar-2.png',       category: 'Fotovoltaico',    title: 'Impianto fotovoltaico — tetto a falda',       location: 'Francolise, CE' },
  { img: '/assets/proj-solar-3.png',       category: 'Fotovoltaico',    title: 'Impianto fotovoltaico 8 pannelli',            location: 'Vairano, CE' },
  { img: '/assets/proj-inverter.png',      category: 'Fotovoltaico',    title: 'Inverter Afore — impianto 6 kW',             location: 'Sparanise, CE' },
  { img: '/assets/proj-solar-thermal.png', category: 'Solare termico',  title: 'Pannelli solari acqua calda sanitaria',       location: 'Calvi Risorta, CE' },
  { img: '/assets/proj-aircon.png',        category: 'Climatizzazione', title: 'Installazione climatizzatori esterni',         location: 'Teano, CE' },
  { img: '/assets/proj-pellet.png',        category: 'Termoidraulica',  title: 'Caldaia a pellet con integrazione termica',   location: 'Pietramelara, CE' },
  { img: '/assets/proj-boiler.png',        category: 'Termoidraulica',  title: 'Caldaia ARCA — sostituzione e installazione', location: 'Teano, CE' },
]

const tagColors = {
  'Fotovoltaico':    'bg-amber-600',
  'Solare termico':  'bg-sky-600',
  'Climatizzazione': 'bg-blue-700',
  'Termoidraulica':  'bg-stone-600',
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-28 bg-stone-100">
      <div className="section-padding max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="section-tag">
              <span className="w-6 h-px bg-orange-700" />
              I nostri lavori
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
              Progetti realizzati
            </h2>
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-primary shrink-0 self-start sm:self-auto group">
            Richiedi un sopralluogo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {projects.map((p, i) => (
            <div key={i} className="group relative overflow-hidden rounded-sm bg-stone-200 cursor-pointer">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/10 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold text-white px-2.5 py-1 rounded-full ${tagColors[p.category]}`}>
                    {p.category.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-bold text-white leading-snug">{p.title}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{p.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — elegante, senza arancione */}
        <div className="mt-6 relative overflow-hidden rounded-sm">
          {/* Background photo */}
          <img
            src="/assets/proj-solar-1.png"
            alt="Impianto ThermoFuture"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/80" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold text-stone-400 tracking-widest uppercase mb-2">
                Lavoriamo in tutta la Campania
              </p>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                Vuoi un impianto simile?
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
                Sopralluogo gratuito e senza impegno a{' '}
                <span className="text-white font-medium">Viale Contrada Santa Reparata</span>.
                Ti rispondiamo entro 24 ore.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-stone-900 font-bold px-6 py-3.5 rounded-sm text-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
                <MessageCircle className="w-4 h-4 text-orange-700" />
                Scrivi su WhatsApp
              </a>
              <CallPicker dark />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
