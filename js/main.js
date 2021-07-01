"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

console.log('MAIN.JS CONNECTED')

// Declaring variables from DOM

// Registration page variables
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const registerBtn = document.querySelector('#registerButton');
const registerForm = document.querySelector('#registerForm');

// Login/Logout page variables
const loginEmail = document.querySelector('#email1');
const loginPassword = document.querySelector('#password1');
const loginButton = document.querySelector('#btn_login');
const logoutButton = document.querySelector('#btn_logout');

// Adding gift idea variables
const giftTitle = document.querySelector('#gift_title');
const giftDescription = document.querySelector('#gift_description');
const addGift = document.querySelector('#btn13');

// Adding idea to own wish list or to friend's
const addToWish = document.querySelector('#addtowish');
const addToFriend = document.querySelector('#addtofriend');

// Add special event variables
const eventName = document.querySelector('#eventname');
const dateOfEvent = document.querySelector('#eventdate');
const addEvent = document.querySelector('#addEventBtn');


//*******************    Creating User Profile object    **********************

class userInfo {
    constructor(username, email) {
        this.username = username,
            this.email = email,
            this.id = firebase.auth().currentUser.uid
    }
    literalObject() {
        return { name: this.username, email: this.email } //makes recognizable for DB
    }

  
//***************    Below Authentication created in auth.js    ***************

    signUp(email, password) {
        // Create a new account by passing the new user's email address and password to createUserWithEmailAndPassword:
        // [START auth_signup_password]
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
        // [END auth_signup_password]
    }

    // DON'T KNOW HOW TO CALL IT - CREATED NEWUSER WITHIN THE EVENT FOR REGISTER SUBMIT, HOW DO I ACCESS IT AFTER?
    signIn(email, password) {
    
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {

            console.log('Error signing in, ', error.message);
            alert(error.message);

        })
        .then((user) => {
            if (user) {
            // Convert alert message to message on UI
            alert('Welcome back.  You are now logged in!');
            }
        }) 
    }

   

    // Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer. NOT WORKING RIGHT NOW - not calling it anywhere...
    state() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
            }
          });
    }
}











