import firebase from "firebase"
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBaQEqPZVNUa4ReFEBQecGTPi4CdWO6rkg",
    authDomain: "fir-92b9a.firebaseapp.com",
    projectId: "fir-92b9a",
    storageBucket: "fir-92b9a.appspot.com",
    messagingSenderId: "800827839535",
    appId: "1:800827839535:web:27f6da30c44f6c7d4922da",
    measurementId: "G-CBBT465PRF"
  };
  export default firebase.initializeApp(firebaseConfig)