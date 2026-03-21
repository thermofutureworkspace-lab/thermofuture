const features = [
  { num: '01', title: 'Sopralluogo gratuito', description: 'Valutiamo la tua situazione senza impegno. Il tecnico viene da te e propone la soluzione migliore.' },
  { num: '02', title: 'Installazione certificata', description: 'Tutti i nostri installatori sono abilitati e certificati. Lavoriamo nel rispetto delle normative vigenti.' },
  { num: '03', title: 'Incentivi e detrazioni', description: 'Ti aiutiamo a sfruttare al massimo gli incentivi statali disponibili per ridurre il costo dell\'impianto.' },
  { num: '04', title: 'Assistenza post-vendita', description: 'Disponibili per manutenzione, assistenza e interventi rapidi dopo l\'installazione.' },
]

export default function Features() {
  return (
    <section className="bg-stone-900 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Photo side */}
        <div className="relative min-h-[280px] lg:min-h-full">
          <img
            src="/assets/proj-solar-3.png"
            alt="Installazione professionale"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/50" />
          <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-10 right-6 sm:right-10">
            <div className="inline-block bg-orange-700 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 mb-3">
              Perché sceglierci
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              Il tuo impianto in <em>mani sicure</em>
            </h2>
          </div>
        </div>

        {/* List side */}
        <div className="divide-y divide-stone-800">
          {features.map(f => (
            <div key={f.num} className="group flex gap-6 p-8 sm:p-10 hover:bg-stone-800 transition-colors">
              <span className="text-sm font-black text-stone-600 mt-0.5 shrink-0 group-hover:text-orange-700 transition-colors">
                {f.num}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-stone-400 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
