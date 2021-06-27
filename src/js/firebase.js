//**************************************************************/
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
    firebase.analytics();

//********** Register page**************************************/
// Register / Sign up new user //

//********** Register page**************************************/
// declaring variables from HTML elements.

// let usernameInput = document.querySelector('#username');
// let emailInput = document.querySelector('#email');
// let passwordInput = document.querySelector('#password');
// let confirmPassword = document.querySelector('#confirmPassword');
// let registerBtn = document.querySelector('#registerButton');
// let registerForm = document.querySelector('#registerForm');

// // collecting data into Object

// class userProfile {
//     constructor(name, email, pw, pw_2) {
//         this.userName = name;
//         this.email = email;
//         this.password = pw;
//         this.confirmPassword = pw_2;
//         this.passwordMatch = function () {
//             if (this.password !== this.confirmPassword) {
//                 document.getElementById('outputMessage').innerHTML = "Your password does not match.  Please try again.";
//             } else {
//                 console.log('Password matched.');
//             }
//         }
//         this.passwordMatch();
//     }

//     get userName() {
//         return this._userName.charAt(0).toUpperCase() + this._userName.slice(1);
//     }
//     set userName(userInput) {
//         if (userInput.length < 2 || typeof userInput !== "string") {
//             document.getElementById('outputMessage').innerHTML = "USERNAME SHOULD BE AT LEAST 2 CHARACTERS LONG and SHOULD CONTAIN LETTERS ONLY";
//             this._userName = userInput;
//         }
//     }

//     get password() {
//         return this._password;
//     }
//     set password(pw) {
//         // Code for password validation taken from  https://www.geeksforgeeks.org/validate-a-password-using-html-and-javascript/
//         if (pw.match(/[a-z]/g) && pw.match(
//             /[0-9]/g) && pw.match(
//                 /[^a-zA-Z\d]/g) && pw.length >= 8) {
//             this._password = pw;
//         } else { document.getElementById('outputMessage').innerHTML = "Password should have at least 1 lowercase letter; 1 digit, 1 special character and be minium 8 characters"; 
//         }
//     }
// };

// registerBtn.addEventListener('submit', (event) => {
//     event.preventDefault(); //MUST REMOVE THIS FOR DEPLOYMENT!!!!!!!!
//     console.log('Form submitted')
//     let newUser = new userProfile(usernameInput.value, emailInput.value, passwordInput.value, confirmPassword.value);


//     firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
//     .then((user) => {
//         if(user) {
//             alert('Welcome to 8Wishes! You are now a registered user!');
//         }
//     })
//     .catch((error) => {
//       let errorMessage = error.message;

//           console.log('Error registering, ', errorMessage);
//           alert(errorMessage);
    
//     });
// });

//**************************************************************/
// Log/Sign In and Sign Out

    //Get the currently signed in user (whether logged in or not)
    firebase.auth().onAuthStateChanged((user) => {
        var notLoggedIn = document.getElementById('not-logged-in');
        var loggedIn = document.getElementById('logged-in');
        if (user) {
            loggedIn.style.display = 'flex';
            notLoggedIn.style.display = 'none';

        // Get User Profile
        const user = firebase.auth().currentUser;
            if (user !== null) {
            // Part of registration form 
            // const displayName = user.displayName;
              const email = user.email;
              document.getElementById('user_para').innerHTML = "Welcome User : " + email;
            }

            } else {
                loggedIn.style.display = 'none';
                notLoggedIn.style.display = 'flex';
            }
    });

    // Logging in

    document.getElementById("btn_login").addEventListener('click', () => {
        let email = document.getElementById('email1').value;
        let password = document.getElementById('password1').value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {

          console.log('Error signing in, ', error.message);
          alert(error.message);

        })
        .then((user) => {
            if(user) {
                // We can have a message on the DOM, rather than alert
                alert('Welcome back.  You are now logged in!');
            }
        })
    })

    // Logging out

    document.getElementById("btn_logout").addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });

            // Housekeeping.
          document.getElementById('email1').value = "";
          document.getElementById('password1').value = "";
          document.getElementById('email1').focus();
    }) 