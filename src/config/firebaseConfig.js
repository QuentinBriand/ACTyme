import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD00KiaIzQ95HVfwCVJTR6EkJTtnTXpEd4",
    authDomain: "actyme-d2c12.firebaseapp.com",
    projectId: "actyme-d2c12",
    storageBucket: "actyme-d2c12.appspot.com",
    messagingSenderId: "961352750530",
    appId: "1:961352750530:web:3aef6c42ca4840d335725b",
    measurementId: "G-5PZQ2V4HV5",
    databaseURL: "https://actyme-d2c12-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);