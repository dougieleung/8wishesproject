"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

// ********************** FIREBASE AUTHENTICATION *****************************

// firebase.auth().currentuser.uid
let newUser = null;

function redirectToHomePage() {
  if (firebase.auth().currentUser.uid) {
    window.setTimeout(function () {
      window.location.href = "./home.html";
    }, 2000);
  } else {
    alert("Please login first!");
  }
}
// *************************** CREATE USER OBJECT *****************************

class userInfo {
  constructor(username, email) {
    (this.username = username), (this.email = email);
  }
  literalObject() {
    return { name: this.username, email: this.email }; //makes recognizable for DB
  }
  signUp(email, password, username) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        if (userCredential) {
          user
            .updateProfile({
              displayName: this.username,
              // photoURL: // some photo url
            })
            .then((s) => console.log(s));
        }
        redirectToHomePage();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }
}

// ************************ NEW USER REGISTRATION *****************************

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("FORM SUBMITTED");
  if (passwordInput.value === confirmPassword.value) {
    newUser = new userInfo(usernameInput.value, emailInput.value);

    newUser.signUp(emailInput.value, passwordInput.value, usernameInput.value);
    registerPage.style.display = "none";
  } else {
    // console.error("Passwords are not matching");

    const outputMessage = document.querySelector("#outputMessage");

    outputMessage.innerHTML = "Passwords are not matching!";
  }
});

// *********************** AUTHENTICATION STATE CHANGE ************************

firebase.auth().onAuthStateChanged((user) => {
  const notLoggedIn = document.getElementById("not-logged-in");
  const loggedIn = document.getElementById("logged-in");
  if (user) {
    loggedIn.style.display = "block";
    notLoggedIn.style.display = "none";

    // Get User Profile
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const email = user.email;
      document.getElementById("user_para").innerHTML =
        "Welcome, " + user.displayName;
      console.log(`User:  ${user}`);
    }
  } else {
    loggedIn.style.display = "none";
    notLoggedIn.style.display = "block";
  }
});

// ****************************** USER LOGIN **********************************

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (email1.value.length && password1.value.length) {
    firebase
      .auth()
      .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
      .then((user) => {
        if (user) {
          console.log("logged in!");
          redirectToHomePage();
        }
      })
      .catch((error) => {
        console.log("Error signing in, ", error.message);

        const errorLogin = document.querySelector("#error-login");
        errorLogin.innerHTML = `Incorrect username or password. Please try again.`;
      });
  } else {
    alert("All fields are mandatory!");
    loginEmail.focus();
  }

  // Housekeeping
  loginEmail.value = "";
  loginPassword.value = "";
  loginEmail.focus();
});

// **********************    LOGOUT EXISTING USER    **************************

logoutButton.addEventListener("click", () => {
  const notLoggedIn = document.getElementById("not-logged-in");

  firebase
    .auth()
    .signOut()
    .then(() => {
      notLoggedIn.style.display = "block";
    })
    .catch((error) => {
      console.error("Error signing out, ", error.message);
      alert(error.message);
    });
  // Housekeeping
  loginEmail.value = "";
  loginPassword.value = "";
  loginEmail.focus();
});
