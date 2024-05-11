import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCoJst7AUKTfGmma6KOa6nDo4OaRFAt0sk",

  authDomain: "proyecto-grado-1555e.firebaseapp.com",

  projectId: "proyecto-grado-1555e",

  storageBucket: "proyecto-grado-1555e.appspot.com",

  messagingSenderId: "667422453198",

  appId: "1:667422453198:web:179375c6ec483245364f9f",

  measurementId: "G-DMRRDEZK3G"

};


export const firebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth= getAuth(firebaseApp);


export const loginWithCredentials = async (email: string, password: string) => {
    try {
      const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
      return resp.user.uid;
    } catch (error) {
      throw error
    }
  };