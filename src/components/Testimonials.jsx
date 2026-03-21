import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    initials: 'MB',
    name: 'Marco B.',
    role: 'Amministratore di condominio',
    text: 'Dopo un inverno rigido, tutti i pannelli termici sono rimasti perfettamente integri e performanti. Il rivestimento ThermoFuture si è ripagato già nella prima stagione.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
  },
  {
    initials: 'SG',
    name: 'Arch. Sofia G.',
    role: 'Architetto',
    text: 'Come professionista cerco sempre soluzioni con forte valore estetico. ThermoFuture mi ha permesso di integrare sistemi termici su un edificio vincolato senza alterare nemmeno una linea.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  },
  {
    initials: 'ER',
    name: 'Elena R.',
    role: 'Proprietaria B&B',
    text: 'Ho scelto la versione ECO DECOR per il mio B&B. Gli ospiti apprezzano sempre l\'aspetto esterno e mi distinguo nel mercato grazie a un dettaglio così unico.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
  },
  {
    initials: 'LM',
    name: 'Luca M.',
    role: 'Area paesaggistica protetta',
    text: 'Vivo in zona paesaggistica protetta e ero preoccupato per l\'impatto visivo. ThermoFuture ha reso tutto armonioso senza rinunciare al comfort e all\'efficienza.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white border-t border-stone-200">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-orange-500" />
              Recensioni
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
              Cosa dicono i nostri clienti
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm text-stone-500 font-medium">4.9 / 5 — 230+ recensioni</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`rounded-sm p-8 flex flex-col ${
                i % 2 === 0 ? 'bg-stone-50 border border-stone-200' : 'bg-stone-900 text-white'
              }`}
            >
              <Quote className={`w-6 h-6 mb-5 ${i % 2 === 0 ? 'text-orange-400' : 'text-orange-500'}`} />

              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className={`text-sm leading-relaxed mb-8 flex-1 italic ${i % 2 === 0 ? 'text-stone-600' : 'text-white/70'}`}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className={`text-sm font-semibold ${i % 2 === 0 ? 'text-stone-900' : 'text-white'}`}>
                    {t.name}
                  </div>
                  <div className={`text-xs ${i % 2 === 0 ? 'text-stone-400' : 'text-white/40'}`}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
