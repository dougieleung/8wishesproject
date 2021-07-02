
// firebase.auth().currentuser.uid
let newUser = null;

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('FORM SUBMITTED')
    if (passwordInput.value === confirmPassword.value) {
        newUser = new userInfo(usernameInput.value, emailInput.value);
        // const reference = await db.collection("users").add(newUser.literalObject());
        // console.log(reference);
        newUser.signUp(emailInput.value, passwordInput.value);




    } else {
        console.error('Passwords are not matching')
    }

})





loginButton.addEventListener('click', () => {
    console.log('Login Clicked')
    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
        .catch((error) => {

            console.log('Error signing in, ', error.message);
            alert(error.message);

        })
        .then((user) => {
            if (user) {
                // We can have a message on the DOM, rather than alert
                console.error('Welcome back.  You are now logged in!');
            }
        })
})

// **********************    Logout Existing User    **************************

logoutButton.addEventListener('click', () => {
    console.log('Logout Clicked')

    firebase.auth().signOut().then(() => {
            // Convert alert message to message on UI
            alert('Thanks for visiting us.  See you later!');

        }).catch((error) => {
            console.error('Error signing out, ', error.message);
            alert(error.message);
        });  
});

// *****Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer. 

    firebase.auth().onAuthStateChanged((user) => {
        const notLoggedIn = document.getElementById('not-logged-in');
        const loggedIn = document.getElementById('logged-in');
        if (user) {
            loggedIn.style.display = 'flex';
            notLoggedIn.style.display = 'none';
        
        // Get User Profile
        const user = firebase.auth().currentUser;
            if (user !== null) {
                const email = user.email;
                document.getElementById('user_para').innerHTML = "Welcome User : " + email;
            }
        
            } else {
                loggedIn.style.display = 'none';
                notLoggedIn.style.display = 'flex';
            }
        });

//Get the currently signed in user (whether logged in or not)
// firebase.auth().onAuthStateChanged((user) => {
//     var notLoggedIn = document.getElementById('not-logged-in');
//     var loggedIn = document.getElementById('logged-in');
//     if (user) {
//         loggedIn.style.display = 'flex';
//         notLoggedIn.style.display = 'none';

//         // Get User Profile
//         const user = firebase.auth().currentUser;
//         if (user !== null) {
//             // Part of registration form 
//             // const displayName = user.displayName;
//             const email = user.email;
//             document.getElementById('user_para').innerHTML = "Welcome User : " + email;
//         }

//     } else {
//         loggedIn.style.display = 'none';
//         notLoggedIn.style.display = 'flex';
//     }
// });