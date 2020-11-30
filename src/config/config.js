import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdDmXjDDA3bfiq8Ub3PA4-5BiE5pbIPew",
    authDomain: "storagemaster-420.firebaseapp.com",
    databaseURL: "https://storagemaster-420.firebaseio.com",
    projectId: "storagemaster-420",
    storageBucket: "storagemaster-420.appspot.com",
    messagingSenderId: "810118346698",
    appId: "1:810118346698:web:700c7751f601b7ae6a4133"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;
