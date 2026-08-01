// Firebase Configuration for CommunityLink
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBuJyTq14UGYgz7ZtNiAn1piCUdl6MivXw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "communitylink-27390.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "communitylink-27390",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "communitylink-27390.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "475455724089",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:475455724089:web:5c27364ca1e905f6b4cbe8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4PBLP1NRB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (if supported in current environment)
export let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
}).catch(() => {});

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile
};

export default app;
