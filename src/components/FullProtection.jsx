import { ArrowRight } from 'lucide-react'

export default function FullProtection() {
  return (
    <section className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Background photo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1800&q=85"
          alt="Protezione completa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/75" />
      </div>

      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 tracking-widest uppercase mb-6">
              <span className="w-6 h-px bg-orange-500" />
              Protezione completa
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Grandine, polvere e UV
              <br />
              <em className="text-orange-400">non sono più una minaccia.</em>
            </h2>
            <p className="text-base text-white/60 leading-relaxed mb-8 max-w-lg">
              Con ThermoFuture il tuo sistema termico è protetto da danni e perdite
              di efficienza. Prolunga la vita del sistema, riduci i costi di manutenzione
              e mantieni un aspetto impeccabile nel tempo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacts"
                className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-8 py-4 rounded-sm text-sm transition-colors group"
              >
                Richiedi consulenza
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-sm text-sm transition-colors"
              >
                Casi studio
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Raggi UV', desc: 'Protezione certificata A+', icon: '☀️' },
              { label: 'Umidità', desc: 'Superficie nano anti-umidità', icon: '💧' },
              { label: 'Vento estremo', desc: 'Testato a 200 km/h', icon: '🌬️' },
              { label: 'Shock termico', desc: '–50°C a +120°C', icon: '🌡️' },
            ].map(item => (
              <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm p-6 hover:bg-white/10 transition-colors">
                <div className="text-2xl mb-3">{item.icon}</div>
                <div className="font-bold text-white text-sm mb-1">{item.label}</div>
                <div className="text-xs text-white/50">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
