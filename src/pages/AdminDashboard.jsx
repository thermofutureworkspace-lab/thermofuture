import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocsFromServer,
  doc,
  updateDoc,
  serverTimestamp,
  deleteField,
  addDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
import {
  RefreshCw,
  LogOut,
  Lock,
  Bell,
  BellOff,
  Loader2,
  CheckSquare,
  Square,
  Volume2,
  VolumeX,
  Video,
  Megaphone,
  Inbox,
  Trash2,
  Upload,
} from 'lucide-react'
import { getDb, getFirebaseAuth, getAllowedAdminEmail, isFirebaseConfigured } from '../lib/firebase'
import {
  playLeadAlertSound,
  isLeadSoundEnabled,
  setLeadSoundEnabled,
} from '../lib/leadAlertSound'
import {
  isCloudinaryReady,
  uploadVideoToCloudinary,
  uploadImageToCloudinary,
} from '../lib/cloudinary'

const MAX_LEADS = 200
const ADDRESS_LABEL = 'Viale Contrada Santa Reparata'

function formatDate(ts) {
  if (!ts?.toDate) return '—'
  try {
    return ts.toDate().toLocaleString('it-IT', {
      dateStyle: 'short',
      timeStyle: 'short',
    })
  } catch {
    return '—'
  }
}

export default function AdminDashboard() {
  useEffect(() => {
    const m = document.createElement('meta')
    m.name = 'robots'
    m.content = 'noindex, nofollow'
    document.head.appendChild(m)
    return () => {
      m.remove()
    }
  }, [])

  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginPending, setLoginPending] = useState(false)

  const [leads, setLeads] = useState([])
  const [leadsError, setLeadsError] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const [notifEnabled, setNotifEnabled] = useState(
    typeof Notification !== 'undefined' && Notification.permission === 'granted'
  )
  /** Alert grande + overlay (tipo popup sistema) */
  const [leadAlert, setLeadAlert] = useState(null)
  const [soundOn, setSoundOn] = useState(() =>
    typeof window !== 'undefined' ? isLeadSoundEnabled() : true
  )
  const [togglingId, setTogglingId] = useState(null)
  const [activeTab, setActiveTab] = useState('leads')

  const [videos, setVideos] = useState([])
  const [videoTitle, setVideoTitle] = useState('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPublished, setVideoPublished] = useState(true)
  const [videoBusy, setVideoBusy] = useState(false)
  const [videoErr, setVideoErr] = useState('')
  const [videoMsg, setVideoMsg] = useState('')

  const [offerEnabled, setOfferEnabled] = useState(false)
  const [offerTitle, setOfferTitle] = useState('')
  const [offerDescription, setOfferDescription] = useState('')
  const [offerImageUrl, setOfferImageUrl] = useState('')
  const [offerImageFile, setOfferImageFile] = useState(null)
  const [offerCtaText, setOfferCtaText] = useState('')
  const [offerCtaUrl, setOfferCtaUrl] = useState('')
  const [offerSaving, setOfferSaving] = useState(false)
  const [offerImageUploading, setOfferImageUploading] = useState(false)
  const [offerMessage, setOfferMessage] = useState('')

  /** Set di id già noti: dopo il primo snapshot serve a rilevare nuovi documenti in modo affidabile. */
  const knownLeadIdsRef = useRef(null)
  const leadsQueryRef = useRef(null)
  const titleFlashIntervalRef = useRef(null)
  const baseDocumentTitleRef = useRef(
    typeof document !== 'undefined' ? document.title : 'ThermoFuture'
  )

  const allowedEmail = getAllowedAdminEmail().toLowerCase()

  function stopTitleFlash() {
    if (titleFlashIntervalRef.current != null) {
      clearInterval(titleFlashIntervalRef.current)
      titleFlashIntervalRef.current = null
    }
    if (typeof document !== 'undefined') {
      document.title = baseDocumentTitleRef.current
    }
  }

  function startTitleFlash() {
    stopTitleFlash()
    let flip = false
    titleFlashIntervalRef.current = setInterval(() => {
      if (typeof document === 'undefined') return
      document.title = flip
        ? baseDocumentTitleRef.current
        : '🔔 Nuova richiesta — ThermoFuture'
      flip = !flip
    }, 900)
  }

  useEffect(() => {
    return () => {
      stopTitleFlash()
    }
  }, [])

  function triggerNewLeadAlert(d, leadId) {
    const name = [d.firstName, d.lastName].filter(Boolean).join(' ') || 'Nuova richiesta'
    const body = `${name} — ${d.email || ''}`.trim()
    setLeadAlert({ id: leadId, name, email: d.email || '', phone: d.phone || '' })
    playLeadAlertSound()
    startTitleFlash()

    if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
      try {
        new Notification('Nuova richiesta dal sito', {
          body: body.length > 220 ? `${body.slice(0, 217)}…` : body,
          tag: `lead-${leadId}`,
          requireInteraction: true,
          renotify: true,
        })
      } catch {
        try {
          new Notification('Nuova richiesta ThermoFuture', {
            body: 'Apri la dashboard per i dettagli.',
            tag: `lead-${leadId}`,
            requireInteraction: true,
          })
        } catch {
          /* ignore */
        }
      }
    }

    try {
      navigator.vibrate?.([100, 80, 100])
    } catch {
      /* ignore */
    }
  }

  function dismissLeadAlert() {
    stopTitleFlash()
    setLeadAlert(null)
  }

  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    setLeadSoundEnabled(next)
    if (next) playLeadAlertSound()
  }

  useEffect(() => {
    const auth = getFirebaseAuth()
    if (!auth) {
      setAuthLoading(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email && u.email.toLowerCase() !== allowedEmail) {
        signOut(auth)
        setUser(null)
        setLoginError('Account non autorizzato per questa dashboard.')
      } else {
        setUser(u)
      }
      setAuthLoading(false)
    })
    return () => unsub()
  }, [allowedEmail])

  useEffect(() => {
    const db = getDb()
    const auth = getFirebaseAuth()
    if (!db || !user?.email) {
      setLeads([])
      return
    }

    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(MAX_LEADS))
    leadsQueryRef.current = q
    knownLeadIdsRef.current = null

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setLeadsError('')
        setLastSync(new Date())
        const rows = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
        const ids = snapshot.docs.map((d) => d.id)
        const byId = Object.fromEntries(snapshot.docs.map((d) => [d.id, d.data()]))

        if (knownLeadIdsRef.current === null) {
          knownLeadIdsRef.current = new Set(ids)
          setLeads(rows)
          return
        }

        const prev = knownLeadIdsRef.current
        const newlyAddedIds = ids.filter((id) => !prev.has(id))

        for (const id of newlyAddedIds) {
          const d = byId[id]
          if (!d) continue
          triggerNewLeadAlert(d, id)
        }

        knownLeadIdsRef.current = new Set(ids)
        setLeads(rows)
      },
      (err) => {
        console.error(err)
        setLeadsError(err.message || 'Errore lettura elenco.')
      }
    )

    return () => unsub()
  }, [user?.email])

  useEffect(() => {
    const db = getDb()
    if (!db || !user?.email) {
      setVideos([])
      return
    }
    const q = query(collection(db, 'socialVideos'), orderBy('createdAt', 'desc'), limit(100))
    const unsub = onSnapshot(
      q,
      (snap) => {
        setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      },
      (err) => setVideoErr(err.message || 'Errore lettura social videos')
    )
    return () => unsub()
  }, [user?.email])

  useEffect(() => {
    const db = getDb()
    if (!db || !user?.email) return
    getDoc(doc(db, 'siteSettings', 'offerPopup'))
      .then((snap) => {
        if (!snap.exists()) return
        const d = snap.data()
        setOfferEnabled(Boolean(d.enabled))
        setOfferTitle(d.title || '')
        setOfferDescription(d.description || '')
        setOfferImageUrl(d.imageUrl || '')
        setOfferCtaText(d.ctaText || '')
        setOfferCtaUrl(d.ctaUrl || '')
      })
      .catch(() => {})
  }, [user?.email])

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError('')
    const auth = getFirebaseAuth()
    if (!auth) {
      setLoginError('Firebase non configurato.')
      return
    }
    setLoginPending(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, loginEmail.trim(), loginPassword)
      if (cred.user.email?.toLowerCase() !== allowedEmail) {
        await signOut(auth)
        setLoginError('Solo l’account amministratore può accedere.')
      }
    } catch (err) {
      setLoginError('Accesso negato. Controlla email e password.')
    } finally {
      setLoginPending(false)
    }
  }

  async function handleLogout() {
    const auth = getFirebaseAuth()
    if (auth) await signOut(auth)
  }

  async function manualRefresh() {
    const q = leadsQueryRef.current
    const db = getDb()
    if (!q || !db) return
    setRefreshing(true)
    setLeadsError('')
    try {
      const snap = await getDocsFromServer(q)
      const mapped = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setLeads(mapped)
      knownLeadIdsRef.current = new Set(snap.docs.map((d) => d.id))
      setLastSync(new Date())
    } catch (err) {
      console.error(err)
      setLeadsError(err.message || 'Aggiornamento fallito.')
    } finally {
      setRefreshing(false)
    }
  }

  async function requestNotificationPermission() {
    if (typeof Notification === 'undefined') return
    try {
      const r = await Notification.requestPermission()
      setNotifEnabled(r === 'granted')
      if (r === 'granted') {
        try {
          new Notification('Notifiche ThermoFuture attive', {
            body:
              'Avviso anche fuori dal browser (Centro notifiche). Usa anche il popup e il suono nella dashboard.',
            requireInteraction: false,
          })
        } catch {
          /* ignore */
        }
      }
    } catch {
      setNotifEnabled(false)
    }
  }

  async function toggleLeadSeen(row, checked) {
    const db = getDb()
    if (!db) return
    setTogglingId(row.id)
    try {
      await updateDoc(doc(db, 'leads', row.id), {
        seen: checked,
        ...(checked ? { seenAt: serverTimestamp() } : { seenAt: deleteField() }),
      })
    } catch (e) {
      console.error(e)
      setLeadsError('Impossibile aggiornare lo stato letto. Controlla le regole Firestore.')
    } finally {
      setTogglingId(null)
    }
  }

  async function handleVideoUpload(e) {
    e.preventDefault()
    setVideoErr('')
    setVideoMsg('')
    if (!videoFile) {
      setVideoErr('Seleziona un file video.')
      return
    }
    if (!isCloudinaryReady()) {
      setVideoErr('Configura VITE_CLOUDINARY_UPLOAD_PRESET prima di caricare.')
      return
    }
    const db = getDb()
    if (!db) return
    setVideoBusy(true)
    try {
      const uploaded = await uploadVideoToCloudinary(videoFile)
      await addDoc(collection(db, 'socialVideos'), {
        title: videoTitle.trim() || 'Video ThermoFuture',
        videoUrl: uploaded.secure_url,
        publicId: uploaded.public_id,
        duration: uploaded.duration ?? 0,
        bytes: uploaded.bytes ?? 0,
        format: uploaded.format ?? '',
        published: videoPublished,
        createdAt: serverTimestamp(),
      })
      setVideoTitle('')
      setVideoFile(null)
      setVideoPublished(true)
      setVideoMsg('Video caricato e pubblicato correttamente.')
    } catch (err) {
      setVideoErr(err.message || 'Upload fallito')
    } finally {
      setVideoBusy(false)
    }
  }

  async function removeVideo(video) {
    if (!confirm('Eliminare questo video dalla sezione Social?')) return
    const db = getDb()
    if (!db) return
    try {
      await deleteDoc(doc(db, 'socialVideos', video.id))
      setVideoMsg('Video rimosso dalla sezione Social.')
    } catch (err) {
      setVideoErr(err.message || 'Eliminazione fallita')
    }
  }

  async function saveOffer(e) {
    e.preventDefault()
    const db = getDb()
    if (!db) return
    setOfferSaving(true)
    setOfferMessage('')
    try {
      await setDoc(
        doc(db, 'siteSettings', 'offerPopup'),
        {
          enabled: offerEnabled,
          title: offerTitle.trim(),
          description: offerDescription.trim(),
          imageUrl: offerImageUrl.trim(),
          ctaText: offerCtaText.trim(),
          ctaUrl: offerCtaUrl.trim(),
          updatedAt: serverTimestamp(),
          updatedBy: user?.email || '',
        },
        { merge: true }
      )
      setOfferMessage('Popup offerta salvato.')
    } catch (err) {
      setOfferMessage(`Errore salvataggio: ${err.message || 'riprova'}`)
    } finally {
      setOfferSaving(false)
    }
  }

  async function uploadOfferImage(e) {
    e.preventDefault()
    if (!offerImageFile) {
      setOfferMessage('Seleziona prima un file immagine.')
      return
    }
    if (!isCloudinaryReady()) {
      setOfferMessage('Cloudinary non configurato correttamente.')
      return
    }
    setOfferImageUploading(true)
    setOfferMessage('')
    try {
      const up = await uploadImageToCloudinary(offerImageFile)
      setOfferImageUrl(up.secure_url || '')
      setOfferImageFile(null)
      setOfferMessage('Immagine popup caricata. Ora salva il popup.')
    } catch (err) {
      setOfferMessage(`Errore upload immagine: ${err.message || 'riprova'}`)
    } finally {
      setOfferImageUploading(false)
    }
  }

  const tabs = useMemo(
    () => [
      { id: 'leads', label: 'Richieste', icon: Inbox },
      { id: 'social', label: 'Social video', icon: Video },
      { id: 'offer', label: 'Popup offerta', icon: Megaphone },
    ],
    []
  )

  if (!isFirebaseConfigured()) {
    return (
      <main className="min-h-screen bg-stone-100 flex items-center justify-center p-6">
        <p className="text-stone-600 text-sm">Firebase non configurato.</p>
      </main>
    )
  }

  if (authLoading) {
    return (
      <main className="min-h-screen bg-stone-100 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-700 animate-spin" />
      </main>
    )
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-stone-200 rounded-sm shadow-sm p-8">
          <div className="flex items-center gap-2 text-stone-800 font-display text-xl font-bold mb-6">
            <Lock className="w-6 h-6 text-orange-700" />
            Accesso dashboard
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm">
              <span className="text-stone-600">Email</span>
              <input
                type="email"
                autoComplete="username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="mt-1 w-full rounded-sm border border-stone-200 px-3 py-2.5 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
                required
              />
            </label>
            <label className="block text-sm">
              <span className="text-stone-600">Password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="mt-1 w-full rounded-sm border border-stone-200 px-3 py-2.5 focus:border-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-600"
                required
              />
            </label>
            {loginError && (
              <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2">{loginError}</p>
            )}
            <button type="submit" disabled={loginPending} className="btn-primary w-full justify-center disabled:opacity-60">
              {loginPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entra'}
            </button>
          </form>
          <Link to="/" className="mt-6 block text-center text-sm text-stone-500 hover:text-orange-700">
            ← Torna al sito
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-100 pb-16">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="section-padding max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-4">
          <div>
            <h1 className="font-display text-xl font-bold text-stone-900">Dashboard Admin</h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {lastSync ? `Ultimo aggiornamento: ${lastSync.toLocaleTimeString('it-IT')}` : 'Caricamento…'} · {ADDRESS_LABEL}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1 text-xs text-stone-700 bg-white border border-stone-200 px-2 py-1 rounded-sm hover:border-orange-600"
              title="Suono breve quando arriva una richiesta (solo sul tuo PC)">
              {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              Suono {soundOn ? 'on' : 'off'}
            </button>
            {notifEnabled ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-sm">
                <Bell className="w-3.5 h-3.5" />
                Notifiche sistema
              </span>
            ) : (
              <button
                type="button"
                onClick={requestNotificationPermission}
                className="inline-flex items-center gap-1 text-xs text-stone-700 bg-white border border-stone-200 px-2 py-1 rounded-sm hover:border-orange-600"
              >
                <BellOff className="w-3.5 h-3.5" />
                Notifiche Windows/Mac
              </button>
            )}
            <button
              type="button"
              onClick={manualRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-2 text-sm font-semibold border border-stone-200 bg-white px-3 py-2 rounded-sm hover:border-orange-600 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              Aggiorna
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-600 border border-stone-200 bg-white px-3 py-2 rounded-sm hover:border-red-300"
            >
              <LogOut className="w-4 h-4" />
              Esci
            </button>
          </div>
        </div>
      </header>

      <div className="section-padding max-w-6xl mx-auto pt-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-semibold border ${
                  activeTab === t.id
                    ? 'bg-orange-700 text-white border-orange-700'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-orange-600'
                }`}>
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            )
          })}
        </div>

        {activeTab === 'leads' && (
          <p className="text-sm text-stone-600 mb-6 max-w-2xl">
            Elenco in <strong>tempo reale</strong>. Con ogni nuova richiesta:{' '}
            <strong>popup in primo piano</strong> sulla dashboard, <strong>suono</strong> (se attivo),{' '}
            <strong>titolo del tab</strong> che lampeggia e notifica sistema.
          </p>
        )}

        {leadAlert && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/55 backdrop-blur-[2px]"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="lead-alert-title">
            <div className="bg-white rounded-sm shadow-2xl border-2 border-orange-600 ring-4 ring-orange-500/25 max-w-md w-full p-6 sm:p-8 relative">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Bell className="w-7 h-7 text-orange-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 id="lead-alert-title" className="font-display text-xl font-bold text-stone-900">
                    Nuova richiesta dal sito
                  </h2>
                  <p className="text-sm text-stone-500 mt-1">Controlla la tabella sotto e rispondi al cliente.</p>
                </div>
              </div>
              <p className="text-lg font-semibold text-stone-900 break-words">{leadAlert.name}</p>
              <div className="mt-3 space-y-1 text-sm">
                {leadAlert.email && (
                  <p>
                    <span className="text-stone-500">Email: </span>
                    <a href={`mailto:${leadAlert.email}`} className="text-orange-800 font-medium underline break-all">
                      {leadAlert.email}
                    </a>
                  </p>
                )}
                {leadAlert.phone && (
                  <p>
                    <span className="text-stone-500">Tel: </span>
                    <a href={`tel:${String(leadAlert.phone).replace(/\s/g, '')}`} className="text-orange-800 font-medium underline">
                      {leadAlert.phone}
                    </a>
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={dismissLeadAlert}
                className="btn-primary w-full justify-center mt-6">
                Ho visto, chiudi avviso
              </button>
            </div>
          </div>
        )}

        {leadsError && activeTab === 'leads' && (
          <div className="mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{leadsError}</div>
        )}
        {activeTab === 'leads' && (
        <div className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs uppercase tracking-wide text-stone-500">
                <tr>
                  <th className="px-3 py-3 font-semibold w-14 text-center">Letta</th>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Nome e cognome</th>
                  <th className="px-4 py-3 font-semibold">Telefono</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold min-w-[180px]">Messaggio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                      Nessuna richiesta ancora.
                    </td>
                  </tr>
                ) : (
                  leads.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-orange-50/40 ${row.seen === true ? 'bg-stone-50/90 opacity-80' : 'bg-white'}`}>
                      <td className="px-3 py-3 text-center align-middle">
                        <label className="inline-flex items-center justify-center cursor-pointer">
                          <span className="sr-only">Segna come letta</span>
                          <input
                            type="checkbox"
                            checked={row.seen === true}
                            disabled={togglingId === row.id}
                            onChange={(e) => toggleLeadSeen(row, e.target.checked)}
                            className="sr-only peer"
                          />
                          <span className="inline-flex text-orange-700 peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 rounded-sm">
                            {row.seen === true ? (
                              <CheckSquare className="w-5 h-5" aria-hidden />
                            ) : (
                              <Square className="w-5 h-5 text-stone-400" aria-hidden />
                            )}
                          </span>
                        </label>
                      </td>
                      <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                      <td className="px-4 py-3 font-medium text-stone-900">
                        {[row.firstName, row.lastName].filter(Boolean).join(' ')}
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${String(row.phone).replace(/\s/g, '')}`} className="text-orange-800 underline">
                          {row.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${row.email}`} className="text-orange-800 underline break-all">
                          {row.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-stone-600 max-w-xs">
                        {row.message ? (
                          <span className="line-clamp-3">{row.message}</span>
                        ) : (
                          <span className="text-stone-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-sm shadow-sm p-6">
              <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Carica video social</h2>
              <p className="text-sm text-stone-500 mb-4">
                Upload automatico su Cloudinary. Per sicurezza NON usiamo API secret nel client:
                configura un preset unsigned in Cloudinary.
              </p>
              {!isCloudinaryReady() && (
                <div className="mb-4 text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-sm p-3">
                  Manca `VITE_CLOUDINARY_UPLOAD_PRESET` nelle variabili ambiente.
                </div>
              )}
              <form onSubmit={handleVideoUpload} className="grid gap-4">
                <input
                  type="text"
                  placeholder="Titolo video"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="rounded-sm border border-stone-200 px-3 py-2.5"
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                  className="rounded-sm border border-stone-200 px-3 py-2.5"
                />
                <label className="inline-flex items-center gap-2 text-sm text-stone-700">
                  <input type="checkbox" checked={videoPublished} onChange={(e) => setVideoPublished(e.target.checked)} />
                  Pubblica subito nella sezione Social
                </label>
                {videoErr && <p className="text-sm text-red-700">{videoErr}</p>}
                {videoMsg && <p className="text-sm text-green-700">{videoMsg}</p>}
                <button type="submit" disabled={videoBusy} className="btn-primary w-fit">
                  {videoBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Carica video
                </button>
              </form>
            </div>

            <div className="bg-white border border-stone-200 rounded-sm overflow-hidden">
              <div className="p-4 border-b border-stone-100 text-sm font-semibold text-stone-700">Video caricati</div>
              <div className="divide-y divide-stone-100">
                {videos.length === 0 ? (
                  <p className="p-4 text-sm text-stone-500">Nessun video caricato.</p>
                ) : (
                  videos.map((v) => (
                    <div key={v.id} className="p-4 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-stone-900 truncate">{v.title || 'Video ThermoFuture'}</p>
                        <p className="text-xs text-stone-500">{v.published === false ? 'Bozza' : 'Pubblicato'}</p>
                      </div>
                      <button type="button" onClick={() => removeVideo(v)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'offer' && (
          <div className="bg-white border border-stone-200 rounded-sm shadow-sm p-6">
            <h2 className="font-display text-2xl font-bold text-stone-900 mb-2">Popup offerta del momento</h2>
            <p className="text-sm text-stone-500 mb-4">Configura il popup mostrato all'apertura del sito.</p>
            <form onSubmit={saveOffer} className="grid gap-4">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={offerEnabled} onChange={(e) => setOfferEnabled(e.target.checked)} />
                Popup attivo
              </label>
              <input className="rounded-sm border border-stone-200 px-3 py-2.5" placeholder="Titolo" value={offerTitle} onChange={(e) => setOfferTitle(e.target.value)} />
              <textarea className="rounded-sm border border-stone-200 px-3 py-2.5" rows={3} placeholder="Descrizione" value={offerDescription} onChange={(e) => setOfferDescription(e.target.value)} />
              <div className="grid gap-2">
                <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">
                  Carica immagine popup (consigliato)
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setOfferImageFile(e.target.files?.[0] || null)}
                    className="rounded-sm border border-stone-200 px-3 py-2.5 w-full"
                  />
                  <button
                    type="button"
                    onClick={uploadOfferImage}
                    disabled={offerImageUploading}
                    className="inline-flex items-center justify-center gap-2 border border-stone-200 rounded-sm px-4 py-2.5 text-sm font-semibold hover:border-orange-600 disabled:opacity-60"
                  >
                    {offerImageUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Carica immagine
                  </button>
                </div>
              </div>
              <input className="rounded-sm border border-stone-200 px-3 py-2.5" placeholder="URL immagine" value={offerImageUrl} onChange={(e) => setOfferImageUrl(e.target.value)} />
              {offerImageUrl && (
                <img
                  src={offerImageUrl}
                  alt="Anteprima popup"
                  className="w-full max-w-xs rounded-sm border border-stone-200 object-cover"
                />
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                <input className="rounded-sm border border-stone-200 px-3 py-2.5" placeholder="Testo bottone" value={offerCtaText} onChange={(e) => setOfferCtaText(e.target.value)} />
                <input className="rounded-sm border border-stone-200 px-3 py-2.5" placeholder="URL bottone" value={offerCtaUrl} onChange={(e) => setOfferCtaUrl(e.target.value)} />
              </div>
              {offerMessage && <p className="text-sm text-stone-600">{offerMessage}</p>}
              <button type="submit" disabled={offerSaving} className="btn-primary w-fit">
                {offerSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Salva popup
              </button>
            </form>
          </div>
        )}

        <Link to="/" className="inline-block mt-8 text-sm text-stone-500 hover:text-orange-700">
          ← Torna al sito pubblico
        </Link>
      </div>
    </main>
  )
}
