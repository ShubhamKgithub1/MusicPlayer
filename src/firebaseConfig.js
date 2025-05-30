// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQAhyxgaTG_JuDEDgicvyWtehpreXMW6E",
  authDomain: "music-player-4a227.firebaseapp.com",
  projectId: "music-player-4a227",
  storageBucket: "music-player-4a227.firebasestorage.app",
  messagingSenderId: "981213669087",
  appId: "1:981213669087:web:623601f749aa3dbc79ab6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export {auth, db};