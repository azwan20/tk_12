// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1wr2rlSYvyImzkNOxq_jB_UBdv4wMvps",
  authDomain: "tk-12-d3a5b.firebaseapp.com",
  projectId: "tk-12-d3a5b",
  storageBucket: "tk-12-d3a5b.appspot.com",
  messagingSenderId: "20690486294",
  appId: "1:20690486294:web:68e62b4a2d006d1a2f6137",
  measurementId: "G-4HT8X10Z6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };