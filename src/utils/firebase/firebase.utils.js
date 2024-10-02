import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, setDoc, getDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";
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

export const auth = getAuth(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});


const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());

        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("Collections and documents have been added successfully!");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items
        return acc;
    }, {});
    return categoryMap;
}

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

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (user) => onAuthStateChanged(auth, user)

