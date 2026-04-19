import { useEffect, useRef, useState } from 'react'
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
} from 'lucide-react'
import { getDb, getFirebaseAuth, getAllowedAdminEmail, isFirebaseConfigured } from '../lib/firebase'
import {
  playLeadAlertSound,
  isLeadSoundEnabled,
  setLeadSoundEnabled,
} from '../lib/leadAlertSound'

const MAX_LEADS = 200

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
            <h1 className="font-display text-xl font-bold text-stone-900">Richieste preventivo</h1>
            <p className="text-xs text-stone-500 mt-0.5">
              {lastSync ? `Ultimo aggiornamento: ${lastSync.toLocaleTimeString('it-IT')}` : 'Caricamento…'}
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
        <p className="text-sm text-stone-600 mb-6 max-w-2xl">
          Elenco in <strong>tempo reale</strong>. Con ogni nuova richiesta:{' '}
          <strong>popup in primo piano</strong> sulla dashboard, <strong>suono</strong> (se attivo),{' '}
          <strong>titolo del tab</strong> che lampeggia, più — se attivi &quot;Notifiche sistema&quot; — un avviso nel{' '}
          <strong>Centro notifiche</strong> di Windows/Mac (gratuito, senza email). L&apos;email automatica richiede
          servizi/server a parte (es. Funzioni Firebase a consumo); qui restiamo su zero costi.
        </p>

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

        {leadsError && (
          <div className="mb-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-sm px-4 py-3">{leadsError}</div>
        )}

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

        <Link to="/" className="inline-block mt-8 text-sm text-stone-500 hover:text-orange-700">
          ← Torna al sito pubblico
        </Link>
      </div>
    </main>
  )
}
