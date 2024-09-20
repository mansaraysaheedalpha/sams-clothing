import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDtgI-_7_Orv5Fu_mURwGpqVQ-sPbnEwB4",
    authDomain: "sams-clothing-db-7ea8c.firebaseapp.com",
    projectId: "sams-clothing-db-7ea8c",
    storageBucket: "sams-clothing-db-7ea8c.appspot.com",
    messagingSenderId: "702846802754",
    appId: "1:702846802754:web:7cd8b90beadcfae0db46db"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,

            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }

    return userDocRef;
}


