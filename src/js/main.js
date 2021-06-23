"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

//********** Register page**************
// declaring variables from HTML elements.
console.log('CONNECTED')

const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');
const registerBtn = document.querySelector('#registerButton');
const registerForm = document.querySelector('#registerForm');

// collecting data into Object

class userProfile {
    constructor(name, email, pw, pw_2) {
        this.userName = name;
        this.email = email;
        this.password = pw;
        this.confirmPassword = pw_2;
        this.passwordMatch = function () {
            if (this.password === this.confirmPassword) {
                console.log('Your passwords are matching!')
            } else {
                console.log('Your passwords are not matching.')
            }
        }
        this.passwordMatch();
    }

    get userName() {
        return this._userName.charAt(0).toUpperCase() + this._userName.slice(1);
    }
    set userName(userInput) {
        if (userInput.length < 2 || typeof userInput !== "string") {
            console.log('USERNAME SHOULD BE AT LEAST 2 CHARACTERS LONG and SHOULD CONTAIN LETTERS ONLY');
            this._userName = userInput;
        }
    }

    get password() {
        return this._password;
    }
    set password(pw) {
        // Code for password validation taken from  https://www.geeksforgeeks.org/validate-a-password-using-html-and-javascript/
        if (pw.match(/[a-z]/g) && pw.match(
            /[0-9]/g) && pw.match(
                /[^a-zA-Z\d]/g) && pw.length >= 8) {
            this._password = pw;
        } else { console.log('Password should have at least 1 lowercase letter; 1 digit, 1 special character and be minium 8 characters') }
    }

}

registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); //MUST REMOVE THIS FOR DEPLOYMENT!!!!!!!!
    console.log('Form submitted')
    let newUser = new userProfile(usernameInput.value, emailInput.value, passwordInput.value, confirmPassword.value);


})
