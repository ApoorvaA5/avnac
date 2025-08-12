// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Note: In a real application, you would use your actual Firebase config
  // For demo purposes, this uses placeholder values
  apiKey: "demo-key",
  authDomain: "canvas-editor-demo.firebaseapp.com", 
  projectId: "canvas-editor-demo",
  storageBucket: "canvas-editor-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);