// Import Firebase dependencies
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtT-VS4QD70YMjLNt4ZFSiVD21Of5P9a4",
  authDomain: "wedding-f3106.firebaseapp.com",
  projectId: "wedding-f3106",
  storageBucket: "wedding-f3106.firebasestorage.app",
  messagingSenderId: "716528699437",
  appId: "1:716528699437:web:3ebd7c553ea436f1bc50a4",
  measurementId: "G-DC45WEJ8ZB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore (and Firebase App if needed)
export { db };
