import React, { useContext, useReducer } from "react";
import { initializeApp } from "firebase/app";
import { createContext } from "react";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const FirebaseContext = createContext();

function Firebase({ initialState, reducer, children }) {
  console.log(firebaseConfig);
  return (
    <FirebaseContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default Firebase;
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KRY,
  authDomain: process.env.REACT_APP_AUTODOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MESUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const UseFirebaseValue = () => useContext(FirebaseContext);
