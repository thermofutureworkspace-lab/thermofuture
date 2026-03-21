import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (email) setDone(true)
  }

  return (
    <section className="py-20 bg-stone-900 border-b border-stone-800">
      <div className="section-padding max-w-7xl mx-auto text-center">
        <p className="text-xs font-semibold text-orange-500 tracking-widest uppercase mb-3">Newsletter</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Resta aggiornato sulle nostre{' '}
          <span className="italic">soluzioni green</span>
        </h2>
        <p className="text-stone-400 text-base mb-10 max-w-md mx-auto">
          Iscriviti per ricevere news, lanci di prodotti e anteprime esclusive di eventi.
        </p>

        {done ? (
          <div className="inline-flex items-center gap-2 text-emerald-400 font-semibold">
            <Check className="w-5 h-5" />
            Iscritto! Benvenuto nella community ThermoFuture.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="La tua email"
              className="flex-1 bg-stone-800 border border-stone-700 focus:border-orange-500 rounded px-5 py-3 text-white placeholder-stone-500 outline-none transition-colors text-sm"
            />
            <button type="submit"
              className="group flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-3 rounded text-sm transition-colors shrink-0">
              Iscriviti
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>
        )}

        <p className="text-xs text-stone-600 mt-4">
          Registrandoti, accetti la nostra{' '}
          <a href="#" className="underline hover:text-stone-400 transition-colors">Privacy Policy</a>.
          Nessuno spam, disdetta gratuita.
        </p>
      </div>
    </section>
  )
}
