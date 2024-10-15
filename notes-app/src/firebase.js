
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlSsG7eAIF-OdtV2TVDDADcSHf6W90Hbw",
  authDomain: "notes-app-44b0a.firebaseapp.com",
  projectId: "notes-app-44b0a",
  storageBucket: "notes-app-44b0a.appspot.com",
  messagingSenderId: "805482176897",
  appId: "1:805482176897:web:ea52e101ba278e33498880"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const notesCollection = collection(db, "notes")