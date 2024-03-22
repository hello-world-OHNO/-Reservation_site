import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcUBYXQFjcBq9TowGj0j5I9MNEIihAQjE",
  authDomain: "reservation-certification.firebaseapp.com",
  projectId: "reservation-certification",
  storageBucket: "reservation-certification.appspot.com",
  messagingSenderId: "235419270622",
  appId: "1:235419270622:web:b75c82c72ff9ea3e3df14f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
