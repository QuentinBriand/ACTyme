import "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD00KiaIzQ95HVfwCVJTR6EkJTtnTXpEd4",
    authDomain: "actyme-d2c12.firebaseapp.com",
    databaseURL:
        "https://actyme-d2c12-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "actyme-d2c12",
    storageBucket: "actyme-d2c12.appspot.com",
    messagingSenderId: "961352750530",
    appId: "1:961352750530:web:3aef6c42ca4840d335725b",
    measurementId: "G-5PZQ2V4HV5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export { auth, provider };
export default firebase;
