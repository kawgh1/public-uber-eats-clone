import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyDJiUdhrcAeAL6nlOE5cxAusg_-T68anmY",

    authDomain: "uber-eats-clone-e9db8.firebaseapp.com",

    projectId: "uber-eats-clone-e9db8",

    storageBucket: "uber-eats-clone-e9db8.appspot.com",

    messagingSenderId: "209393563809",

    appId: "1:209393563809:web:5b2132657c51987d5258e0",
};

// Initialize Firebase

// if there is no firebase app, then initialize, otherwise use the existing app
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { db };

export default firebase;
