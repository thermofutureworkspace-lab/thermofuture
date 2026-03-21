import { ArrowUpRight } from 'lucide-react'

const articles = [
  {
    category: 'Evento',
    date: '10 Mar 2026',
    title: 'Thermal Innovation Summit Europe 2026 — Accelerare la transizione energetica degli edifici',
    excerpt: 'ThermoFuture ha presentato la tecnologia THERM&GREEN al summit annuale, dimostrando una riduzione del 40% dei costi rispetto ai metodi tradizionali.',
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1000&q=80',
    featured: true,
  },
  {
    category: 'Normativa',
    date: '28 Feb 2026',
    title: 'Nuova Direttiva UE sull\'efficienza energetica degli edifici',
    excerpt: 'L\'EPBD aggiornata fissa obiettivi più severi per il termico. Ecco come raggiungere i target 2030 in anticipo.',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Tecnologia',
    date: '15 Feb 2026',
    title: 'ThermoFuture @ KEY ENERGY 2026 — Recap e nuovi prodotti',
    excerpt: 'Oltre 3.000 visitatori e il debutto della linea ECO DECOR con generazione pattern AI.',
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Report',
    date: '30 Gen 2026',
    title: 'Inverni estremi in Lombardia: perché la protezione termica è più importante che mai',
    excerpt: 'Dopo ondate di freddo record le installazioni ThermoFuture sono rimaste intatte e operative al 100%.',
    img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80',
  },
]

export default function News() {
  const [featured, ...rest] = articles

  return (
    <section id="news" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="section-padding max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-orange-600 tracking-widest uppercase mb-4">
              <span className="w-6 h-px bg-orange-500" />
              Ultime notizie
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900">
              Dal blog
            </h2>
          </div>
          <a
            href="#"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors shrink-0 self-start sm:self-auto"
          >
            Tutti gli articoli <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Featured article */}
        <div className="group grid grid-cols-1 lg:grid-cols-2 bg-white rounded-sm overflow-hidden mb-4 cursor-pointer border border-stone-200 hover:border-stone-300 transition-colors">
          <div className="relative overflow-hidden min-h-72">
            <img
              src={featured.img}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-xs font-bold text-orange-600 tracking-widest uppercase bg-orange-50 px-3 py-1 rounded-full">
                {featured.category}
              </span>
              <span className="text-xs text-stone-400">{featured.date}</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-4 leading-snug group-hover:text-orange-700 transition-colors">
              {featured.title}
            </h3>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">{featured.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
              Leggi di più <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rest.map(a => (
            <div
              key={a.title}
              className="group bg-white rounded-sm overflow-hidden cursor-pointer border border-stone-200 hover:border-stone-300 transition-colors"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={a.img}
                  alt={a.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-orange-600 tracking-widest uppercase">{a.category}</span>
                  <span className="text-xs text-stone-400">{a.date}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2 leading-snug group-hover:text-orange-700 transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed mb-5 line-clamp-2">{a.excerpt}</p>
                <span className="text-sm font-semibold text-orange-600 flex items-center gap-1">
                  Leggi di più <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
