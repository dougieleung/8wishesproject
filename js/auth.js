"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

//*****************************************************************************
//******************This page is for User Authentication: *********************
//************Registering, Signing in/out and User Login status****************
//*****************************************************************************

// firebase.auth().currentuser.uid
let newUser = null;

// ***********************    Register new user    ****************************

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

// **********************    Login Existing User    ***************************

loginButton.addEventListener('click', () => {
    console.log('Login Clicked')

    firebase.auth().signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
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