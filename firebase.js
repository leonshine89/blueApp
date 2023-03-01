// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0pwPLHfEY74ZMXK6r-Zr0CAA9yORYepo",
  authDomain: "fb-clone-1cc64.firebaseapp.com",
  projectId: "fb-clone-1cc64",
  storageBucket: "fb-clone-1cc64.appspot.com",
  messagingSenderId: "1066684423814",
  appId: "1:1066684423814:web:196e0344398ab7858d7b07",
  measurementId: "G-JKBNV9H1PK",
}

// Initialize Firebase
// const app = !firebase.apps.length
//   ? initializeApp(firebaseConfig)
//   : firebase.app()
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, storage }
