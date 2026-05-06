import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { PlayCircle, ExternalLink } from 'lucide-react'
import { getDb } from '../lib/firebase'

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thermo_futuredmr/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@robertodemonaco?is_from_webapp=1&sender_device=pc' },
  { label: 'Facebook', href: 'https://www.facebook.com/dmrsrlteano/?locale=it_IT' },
]

export default function SocialSection() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const db = getDb()
    if (!db) return undefined
    const q = query(collection(db, 'socialVideos'), orderBy('createdAt', 'desc'), limit(12))
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setVideos(rows.filter((v) => v.published !== false))
    })
    return () => unsub()
  }, [])

  return (
    <section id="social" className="py-20 sm:py-28 bg-white border-t border-stone-200">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="section-tag">
            <span className="w-6 h-px bg-orange-700" />
            Social
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Social
          </h2>
          <p className="mt-3 text-stone-500 max-w-2xl">
            Video reali dei nostri lavori pubblicati in home. Seguici anche sui nostri canali social ufficiali.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold border border-stone-200 bg-white text-stone-700 hover:border-orange-700 hover:text-orange-700 rounded-sm px-3 py-2"
              >
                {s.label}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {videos.length === 0 ? (
          <div className="rounded-sm border border-stone-200 bg-stone-50 p-8 text-sm text-stone-500">
            Nessun video pubblicato al momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {videos.map((v) => (
              <article key={v.id} className="group rounded-sm overflow-hidden border border-stone-200 bg-white shadow-sm">
                <div className="relative bg-stone-100">
                  <video
                    src={v.videoUrl}
                    controls
                    preload="metadata"
                    className="w-full aspect-video object-cover"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white">
                    <PlayCircle className="w-3.5 h-3.5" />
                    Video
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-stone-900 line-clamp-2">{v.title || 'Installazione ThermoFuture'}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
