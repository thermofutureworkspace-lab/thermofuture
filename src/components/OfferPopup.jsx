import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { X } from 'lucide-react'
import { getDb } from '../lib/firebase'

export default function OfferPopup() {
  const [offer, setOffer] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const db = getDb()
    if (!db) return undefined
    const ref = doc(db, 'siteSettings', 'offerPopup')
    const unsub = onSnapshot(ref, (snap) => {
      if (!snap.exists()) return
      const data = snap.data()
      if (!data?.enabled) return
      const token = data.updatedAt?.seconds ? String(data.updatedAt.seconds) : 'v1'
      const key = `tf_offer_seen_${token}`
      if (sessionStorage.getItem(key) === '1') return
      setOffer(data)
      setOpen(true)
      sessionStorage.setItem(key, '1')
    })
    return () => unsub()
  }, [])

  if (!open || !offer) return null

  return (
    <div className="fixed inset-0 z-[250] bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4">
      <div className="bg-white rounded-sm shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden relative">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 p-1.5 rounded-sm text-stone-500 hover:text-stone-900 hover:bg-stone-100"
          aria-label="Chiudi popup">
          <X className="w-4 h-4" />
        </button>

        {offer.imageUrl && (
          <img src={offer.imageUrl} alt={offer.title || 'Offerta del momento'} className="w-full h-52 sm:h-64 object-cover" />
        )}

        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-stone-900">
            {offer.title || 'Offerta del momento'}
          </h3>
          {offer.description && <p className="mt-3 text-stone-600">{offer.description}</p>}
          {offer.ctaUrl && (
            <a
              href={offer.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-5 w-full justify-center">
              {offer.ctaText || 'Scopri ora'}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
