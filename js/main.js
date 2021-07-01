console.log('MAIN.JS CONNECTED')

// Declaring variables from DOM
let usernameInput = document.querySelector('#username');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let registerBtn = document.querySelector('#registerButton');
let registerForm = document.querySelector('#registerForm');

let loginButton = document.querySelector('#btn_login')
let loginEmail = document.querySelector('#email1')
let loginPassword = document.querySelector('#password1')

let giftTitle = document.querySelector('#gift_title')

let addGift = document.querySelector('#btn13')


class userInfo {
    constructor(username, email) {
        this.username = username,
            this.email = email,
            this.id = firebase.auth().currentUser.uid
    }
    literalObject() {
        return { name: this.username, email: this.email } //makes recognizable for DB
    }
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
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
            });
    }

    // Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer. NOT WORKING RIGHT NOW - not calling it anywhere...
    state() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {

                var uid = user.uid;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
    }

}






