const challenges = [
  {
    tag: 'AMBIENTALE',
    title: 'Preservare e valorizzare l\'estetica',
    description: 'Mantenere la bellezza di edifici storici, paesaggi protetti e architetture moderne garantendo al contempo le massime prestazioni termiche.',
  },
  {
    tag: 'TECNICO',
    title: 'Unire estetica ed efficienza',
    description: 'Combinare la libertà progettuale con i più alti standard di isolamento termico, durabilità ed efficienza energetica senza compromessi.',
  },
  {
    tag: 'CULTURALE',
    title: 'Su misura per ogni utente',
    description: 'Dare a proprietari, architetti e developer la possibilità di personalizzare completamente i sistemi termici, eliminando ogni impatto visivo negativo.',
  },
]

export default function Challenges() {
  return (
    <section className="py-24 bg-stone-900 border-b border-stone-800">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">Il nostro approccio</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Bellezza e innovazione,{' '}
            <span className="italic">senza compromessi</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {challenges.map(c => (
            <div key={c.tag} className="px-10 py-8 text-center">
              <div className="inline-block text-xs font-bold text-orange-500 tracking-widest uppercase border border-orange-500/30 rounded-full px-3 py-1 mb-5">
                {c.tag}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{c.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
