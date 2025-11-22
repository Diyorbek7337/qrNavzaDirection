import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCDoOErt5MOuKwZB3pkd2_O08NoDMPJ4fA",
  authDomain: "navza-lounge-rating.firebaseapp.com",
  databaseURL: "https://navza-lounge-rating-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "navza-lounge-rating",
  storageBucket: "navza-lounge-rating.firebasestorage.app",
  messagingSenderId: "145885466264",
  appId: "1:145885466264:web:8a582af458758381788aed"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Anonymous login
signInAnonymously(auth).catch((error) => {
  console.error('Auth xatosi:', error);
});

export { database, auth };