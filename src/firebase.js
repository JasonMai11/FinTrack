import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzAxK-3omy0HAXr0eiuUD1otTALR-6nZc",
  authDomain: "fintrack-51b83.firebaseapp.com",
  projectId: "fintrack-51b83",
  storageBucket: "fintrack-51b83.appspot.com",
  messagingSenderId: "208059977732",
  appId: "1:208059977732:web:bf268461ffa708757b6551",
  measurementId: "G-FK2K0HM86J"
};

const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firestore, auth };