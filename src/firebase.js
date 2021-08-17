import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCneIpfvwiyknC4LLhrwoVle5nQICLtO1k",
    authDomain: "photogram-clone-app.firebaseapp.com",
    projectId: "photogram-clone-app",
    storageBucket: "photogram-clone-app.appspot.com",
    messagingSenderId: "209168370638",
    appId: "1:209168370638:web:6c179110ab0a0e0557f99f"
  };

  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};
  