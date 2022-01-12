import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyDArKVhGMHVr2nXVSr61X-igDTNVOs3Rj8",
    authDomain: "warkerweb.firebaseapp.com",
    databaseURL: "https://warkerweb-default-rtdb.firebaseio.com",
    projectId: "warkerweb",
    storageBucket: "warkerweb.appspot.com",
    messagingSenderId: "449077088711",
    appId: "1:449077088711:web:37ecf89e7cb2a87f6b89e2"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const database = firebase.database()


export { firebase, auth, database };