import { initializeApp, getApps, getApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyDuoHRH6nevDJD8bGoIZQVKBQpujbFVvqg",
  authDomain: "projeto-bubblepet.firebaseapp.com",
  projectId: "projeto-bubblepet",
  storageBucket: "projeto-bubblepet.firebasestorage.app",
  messagingSenderId: "772272313099",
  appId: "1:772272313099:web:d0162c20a21d1f7738480e"
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

let auth
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
} catch (erro) {
  auth = getAuth(app) 
}

export { auth }
