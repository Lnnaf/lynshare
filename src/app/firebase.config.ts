// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "blog-firebase-4ba64.firebaseapp.com",
  projectId: "blog-firebase-4ba64",
  storageBucket: "blog-firebase-4ba64.appspot.com",
  messagingSenderId: "964353529290",
  appId: "1:964353529290:web:4360988b7593ae20956b33"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
export default storage
