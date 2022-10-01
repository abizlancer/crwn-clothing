import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe7ilh5dxp-ZDXbiwZ1YvtT3ffPcDkBoE",
  authDomain: "crwn-clothing-bd0d9.firebaseapp.com",
  projectId: "crwn-clothing-bd0d9",
  storageBucket: "crwn-clothing-bd0d9.appspot.com",
  messagingSenderId: "193090323917",
  appId: "1:193090323917:web:50bffcd448509da9c23084"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionlaInformation = {}
  ) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)
  
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionlaInformation
      })
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }
  
  return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInAuthUserWithEmailAndPassword(auth, email, password)
}

