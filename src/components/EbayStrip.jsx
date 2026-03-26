import { ShoppingCart, ExternalLink, Package } from 'lucide-react'

const EBAY_URL = 'https://ebay.us/m/bzefRF'

export default function EbayStrip() {
  return (
    <section className="bg-stone-900 border-y border-stone-800">
      <div className="section-padding max-w-7xl mx-auto py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

          {/* Text */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-sm bg-[#e53238]/10 border border-[#e53238]/20 flex items-center justify-center shrink-0 mt-0.5">
              <Package className="w-6 h-6 text-[#e53238]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-500 tracking-widest uppercase mb-1">
                Termoricambi · Shop online
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Hai bisogno di un pezzo di ricambio?
              </h2>
              <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
                Forniamo ricambi originali e compatibili per caldaie, climatizzatori, 
                impianti solari e termoidraulici. Acquista direttamente sul nostro 
                negozio eBay con spedizione rapida in tutta Italia.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
            <a
              href={EBAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#e53238] hover:bg-[#c9252b] text-white font-bold px-7 py-4 rounded-sm text-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-900/30 hover:-translate-y-0.5 group"
            >
              <ShoppingCart className="w-4 h-4" />
              Acquista su eBay
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </a>
          </div>

        </div>

        {/* Categories strip */}
        <div className="mt-8 pt-8 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Ricambi caldaie',        icon: '🔥' },
            { label: 'Ricambi climatizzatori',  icon: '❄️' },
            { label: 'Componentistica solare',  icon: '☀️' },
            { label: 'Accessori termoidraulici',icon: '🔧' },
          ].map(c => (
            <a
              key={c.label}
              href={EBAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-stone-500 rounded-sm px-4 py-3 text-xs font-medium text-stone-300 hover:text-white transition-all duration-200 group"
            >
              <span className="text-base">{c.icon}</span>
              {c.label}
              <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
