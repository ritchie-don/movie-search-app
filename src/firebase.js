import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCIGyGPXI7ltHPG26hTF7M9j074EWLMPqI",
  authDomain: "movie-search-app-a53d6.firebaseapp.com",
  projectId: "movie-search-app-a53d6",
  storageBucket: "movie-search-app-a53d6.firebasestorage.app",
  messagingSenderId: "589313291529",
  appId: "1:589313291529:web:caae6dabbea70034d2cfd8"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export default app