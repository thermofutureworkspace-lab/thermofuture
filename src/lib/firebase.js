import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/** Config pubblica (API key ok su client). Sovrascrivibile con variabili VITE_FIREBASE_* su Vercel. */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'AIzaSyAwcK7B72kF0RPXBobwo4pkFvk9UxfAtbA',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'thermofuture-7d3a8.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'thermofuture-7d3a8',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'thermofuture-7d3a8.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '401948045489',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '1:401948045489:web:6fc11986f83d0c2b76b290',
}

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
}

let appInstance = null

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null
  if (!appInstance) {
    appInstance = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  }
  return appInstance
}

export function getFirebaseAuth() {
  const app = getFirebaseApp()
  return app ? getAuth(app) : null
}

export function getDb() {
  const app = getFirebaseApp()
  return app ? getFirestore(app) : null
}

/** Email che può accedere alla dashboard (verifica anche lato Firestore rules). */
export function getAllowedAdminEmail() {
  return import.meta.env.VITE_ADMIN_EMAIL ?? 'thermofuture.workspace@gmail.com'
}
