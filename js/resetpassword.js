// ********************************************************************************************
// ************************* This page is the code to reset password **************************
// ********************************************************************************************

'use strict';

console.log("Connected to resetpassword.js");

// *************************** global variables used in the script ****************************

const emailtoreset = document.querySelector("#email_to_reset");
const resetPassword = document.querySelector("#reset_password");
const backtologin = document.querySelector("#backtologin");
const resetfeedback = document.querySelector("#resetfeedback");
const noreset = document.querySelector("#noreset");

// ************************************ Reset user password ***********************************

resetPassword.addEventListener("click", (event) => {
    event.preventDefault();
    const emailreset = emailtoreset.value.trim();

    if(emailtoreset.value !== "") {
    firebase.auth().sendPasswordResetEmail(emailreset)
    .then(() => {
    console.log('Password is reset. Check your e-mail!');
    })
    .catch((error) => {
            console.error('Error sending reset password e-mail, ', error.message);
            alert(error.message);
    })

    resetfeedback.innerHTML = "Your password is reset. Please check your e-mail.";
    emailtoreset.value = "";
    emailtoreset.focus();

    backtologin.style.display = "flex";
    noreset.style.display = "none";
    resetPassword.style.display = "none";
    } else {
    resetfeedback.innerHTML = "Please enter an e-mail in the field";
    }
});

backtologin.addEventListener("click", () => {

    noreset.style.display = "flex";
    backtologin.style.display = "none";

});