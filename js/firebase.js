// ********************************************************************************************
// ********************* This page is the code for Firebase Initialization ********************
// ********************************************************************************************


console.log("Connected to firebase.js");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyB2hCUVUmTQLX97bwgH9_MrY8a8Qq6sISY",
    authDomain: "wishes-7049e.firebaseapp.com",
    projectId: "wishes-7049e",
    storageBucket: "wishes-7049e.appspot.com",
    messagingSenderId: "1002889847573",
    appId: "1:1002889847573:web:1d6b6980c530203d2f3f1c",
    measurementId: "G-XYKCRYZSM6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Declare Firebase Auth and DB
const auth = firebase.auth();
const db = firebase.firestore();
// images storage
var storage = firebase.storage();


