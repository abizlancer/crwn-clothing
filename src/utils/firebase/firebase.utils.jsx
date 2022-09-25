import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
 } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe7ilh5dxp-ZDXbiwZ1YvtT3ffPcDkBoE",
  authDomain: "crwn-clothing-bd0d9.firebaseapp.com",
  projectId: "crwn-clothing-bd0d9",
  storageBucket: "crwn-clothing-bd0d9.appspot.com",
  messagingSenderId: "193090323917",
  appId: "1:193090323917:web:50bffcd448509da9c23084"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
})
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  console.log(userDocRef);
  
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  
  if(!userSnapshot.exists()) {
    const {displayName, email} = userAuth
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }
  
  return userDocRef
}
