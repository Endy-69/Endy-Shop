import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBLB5UFu9jzTak_xDzqjDBOS7z4sQor1IM",
  authDomain: "endy-shop.firebaseapp.com",
  projectId: "endy-shop",
  storageBucket: "endy-shop.appspot.com",
  messagingSenderId: "935853067998",
  appId: "1:935853067998:web:2093ea8cc7a3dc0bbd3c4f",
  measurementId: "G-80NFQ7FDE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app; 