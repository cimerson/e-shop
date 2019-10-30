import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDicYS4-u6MoE8cOjt8ZXVXkHlHg_HI1aE",
    authDomain: "e-db-6d28a.firebaseapp.com",
    databaseURL: "https://e-db-6d28a.firebaseio.com",
    projectId: "e-db-6d28a",
    storageBucket: "e-db-6d28a.appspot.com",
    messagingSenderId: "1042815131949",
    appId: "1:1042815131949:web:6b94d4d1bcea10a4d733a4"
};

export const createUserProfileDocument = async ( userAuth, additionalData ) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
        
    }

    return userRef;

};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
