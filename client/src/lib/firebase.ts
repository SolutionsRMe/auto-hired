import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

// Check if Firebase credentials are available
console.log('Firebase env check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'SET' : 'NOT SET',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'SET' : 'NOT SET',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'SET' : 'NOT SET'
});

const hasFirebaseCredentials = 
  import.meta.env.VITE_FIREBASE_API_KEY && 
  import.meta.env.VITE_FIREBASE_PROJECT_ID && 
  import.meta.env.VITE_FIREBASE_APP_ID;

let app: any = null;
let auth: any = null;

if (hasFirebaseCredentials) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebasestorage.app`,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth };

// Google Auth Provider (only if Firebase is configured)
let googleProvider: GoogleAuthProvider | null = null;

if (hasFirebaseCredentials && auth) {
  googleProvider = new GoogleAuthProvider();
  googleProvider.addScope('email');
  googleProvider.addScope('profile');
}

// Auth functions
export const signInWithGoogle = async () => {
  if (!hasFirebaseCredentials || !auth || !googleProvider) {
    throw new Error("Firebase not configured. Please provide Firebase credentials.");
  }
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  if (!hasFirebaseCredentials || !auth) {
    throw new Error("Firebase not configured. Please provide Firebase credentials.");
  }
  
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Auth state listener
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  if (!hasFirebaseCredentials || !auth) {
    // If Firebase isn't configured, call callback with null user
    callback(null);
    return () => {}; // Return empty unsubscribe function
  }
  
  return onAuthStateChanged(auth, callback);
};

// Export Firebase availability status
export const isFirebaseConfigured = hasFirebaseCredentials;

export default app;