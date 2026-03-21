import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Shield, ChevronDown, ChevronUp } from 'lucide-react'

const STORAGE_KEY = 'tf_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const save = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        accepted: true,
        necessary: true,
        analytics: preferences.analytics,
        timestamp: new Date().toISOString(),
      }))
    } catch {}
    setVisible(false)
  }

  const acceptAll = () => save({ analytics: true })
  const acceptNecessary = () => save({ analytics: false })
  const savePreferences = () => save({ analytics })

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t-2 border-orange-700 shadow-2xl">
      <div className="section-padding max-w-7xl mx-auto py-5 sm:py-6">

        {/* Main row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <Shield className="w-8 h-8 text-orange-700 shrink-0 mt-0.5 sm:mt-0" />

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-stone-900 mb-1">
              Questo sito utilizza i cookie
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              Utilizziamo cookie tecnici necessari per il funzionamento del sito. 
              Puoi accettare tutti i cookie, scegliere solo quelli necessari, 
              o gestire le preferenze. Per saperne di più leggi la{' '}
              <Link to="/cookie-policy" className="underline hover:text-orange-700 transition-colors">
                Cookie Policy
              </Link>{' '}
              e la{' '}
              <Link to="/privacy-policy" className="underline hover:text-orange-700 transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            <button onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-stone-800 border border-stone-200 hover:border-stone-300 px-3 py-2 rounded-sm transition-colors">
              Gestisci
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button onClick={acceptNecessary}
              className="text-xs font-semibold text-stone-600 border border-stone-300 hover:border-stone-400 px-4 py-2 rounded-sm transition-colors">
              Solo necessari
            </button>
            <button onClick={acceptAll}
              className="text-xs font-semibold bg-orange-700 hover:bg-orange-700 text-white px-5 py-2 rounded-sm transition-colors">
              Accetta tutti
            </button>
          </div>
        </div>

        {/* Expanded preferences */}
        {expanded && (
          <div className="mt-5 pt-5 border-t border-stone-100">
            <p className="text-xs font-semibold text-stone-700 mb-4">Gestisci preferenze cookie</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {/* Necessary */}
              <div className="flex items-start justify-between gap-4 p-4 bg-stone-50 rounded-sm border border-stone-100">
                <div>
                  <div className="text-sm font-semibold text-stone-800 mb-1">Cookie tecnici</div>
                  <div className="text-xs text-stone-500 leading-relaxed">
                    Necessari per il funzionamento del sito. Non possono essere disabilitati.
                  </div>
                </div>
                <div className="mt-1 shrink-0">
                  <div className="w-10 h-5 bg-orange-700 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                  </div>
                  <div className="text-[10px] text-stone-400 text-center mt-1">Sempre attivi</div>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 p-4 bg-stone-50 rounded-sm border border-stone-100">
                <div>
                  <div className="text-sm font-semibold text-stone-800 mb-1">Cookie analitici</div>
                  <div className="text-xs text-stone-500 leading-relaxed">
                    Ci aiutano a capire come viene utilizzato il sito per migliorarlo.
                  </div>
                </div>
                <button onClick={() => setAnalytics(!analytics)} className="mt-1 shrink-0">
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${analytics ? 'bg-orange-700' : 'bg-stone-300'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${analytics ? 'right-0.5' : 'left-0.5'}`} />
                  </div>
                  <div className="text-[10px] text-stone-400 text-center mt-1">{analytics ? 'Attivi' : 'Non attivi'}</div>
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={savePreferences}
                className="text-sm font-semibold bg-orange-700 hover:bg-orange-700 text-white px-6 py-2.5 rounded-sm transition-colors">
                Salva preferenze
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
