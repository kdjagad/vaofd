import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const firebaseConfig = {
    apiKey: "AIzaSyBH8XZTbkxauiyEfhLEI20YXJcIBOcd1Cs",
    authDomain: "vaofd-f801b.firebaseapp.com",
    projectId: "vaofd-f801b",
    storageBucket: "vaofd-f801b.appspot.com",
    messagingSenderId: "629019810080",
    appId: "1:629019810080:web:bcc92f2a82f87f00175f45",
    measurementId: "G-6BEPH3GWNB"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = () => new Promise(async (resolve, reject) => {

    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        const userData = {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
        }
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), userData);
        }
        resolve(userData);
    } catch (err) {
        reject(err);
        console.error(err);
        alert(err.message);
    }
});
const logInWithEmailAndPassword = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const q = query(collection(db, "users"), where("email", "==", email));
        const docs = await getDocs(q);
        console.log("docs", docs.docs[0].data());
        if (docs.docs.length > 0) {
            resolve(docs.docs[0].data())
        }
    } catch (err) {
        reject(err);
        console.error(err);
        alert(err.message);
    }
});
const registerWithEmailAndPassword = ({ name, email, password }) => new Promise(async (resolve, reject) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const userData = {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        }
        await addDoc(collection(db, "users"), userData);
        resolve(userData);
    } catch (err) {
        reject(err)
        console.error(err);
        alert(err.message);
    }
});
const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};
const logout = () => {
    signOut(auth);
};
export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
};