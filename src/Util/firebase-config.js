import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "leukemiasystem-b402b.firebaseapp.com",
    projectId: "leukemiasystem-b402b",
    storageBucket: "leukemiasystem-b402b.appspot.com",
    messagingSenderId: "671965056618",
    appId: "1:671965056618:web:a01c54f63994a5f1930413"
};

const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);