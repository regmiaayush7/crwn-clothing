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

  //Creating and storing authenticated user in firebase
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; 
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
           displayName,
           email,
           createdAt,
           ...additionalData   
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };
 
//Adds redux data or state into firebase database
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd ) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj)
    });

    return await batch.commit();
  };

// Converts the firebase data which was in array to objects and adds route
// to the collection
  export const convertCollectionsnapShotToMap = collections  => {
    const transformedCollection = collections.docs.map(doc => {
      const { title, items } = doc.data();
      
      return{
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      };
    });

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});
  
  };
  
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  //Google Authentication
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;