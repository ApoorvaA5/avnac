import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "canvas-editor-demo.firebaseapp.com",
  projectId: "canvas-editor-demo",
  storageBucket: "canvas-editor-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);