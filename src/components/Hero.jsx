import { ArrowRight, ChevronDown, Phone } from 'lucide-react'

const WA = 'https://wa.me/393792064226?text=Ciao,%20vorrei%20richiedere%20un%20preventivo%20gratuito'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1800&q=85"
          alt="Edificio moderno"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/65 to-stone-900/20" />
      </div>

      <div className="relative z-10 section-padding max-w-7xl mx-auto w-full pb-14 pt-28 sm:pt-36">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-8 h-px bg-orange-500" />
          <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">
            Teano · Campania · dal 1990
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-white mb-5 max-w-4xl">
          Energia per la tua{' '}
          <em className="text-orange-400 not-italic">casa e azienda</em>
        </h1>

        <p className="text-base sm:text-lg text-white/60 max-w-lg leading-relaxed mb-8">
          Installiamo impianti fotovoltaici, termoidraulici, climatizzatori e pompe di calore.
          Qualità certificata, preventivo gratuito e veloce.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={WA} target="_blank" rel="noopener noreferrer"
            className="btn-primary group text-center">
            Richiedi preventivo gratuito
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:+393792064226"
            className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/70 text-white font-semibold px-7 py-3.5 rounded-sm text-sm transition-all duration-200 hover:-translate-y-0.5">
            <Phone className="w-4 h-4" />
            379 206 4226
          </a>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: '35+', label: 'Anni di esperienza' },
            { value: '500+', label: 'Impianti installati' },
            { value: '100%', label: 'Soddisfazione clienti' },
            { value: '24h', label: 'Risposta garantita' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a href="#services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors">
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
