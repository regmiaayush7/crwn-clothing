import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCkYW2-1B0TjFo7Z-U8gZWumHUpY3b5odc",
    authDomain: "crwn-db-22f91.firebaseapp.com",
    projectId: "crwn-db-22f91",
    storageBucket: "crwn-db-22f91.appspot.com",
    messagingSenderId: "547085005593",
    appId: "1:547085005593:web:23884e0e1e4fd9fbc18b88",
    measurementId: "G-D113Z8BNF3"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Google Authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInwithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;