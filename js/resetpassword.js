// ************************** RESET USER PASSWORD *****************************

resetPassword.addEventListener('click', () => {

    firebase.auth().sendPasswordResetEmail(emailtoreset.value)
    .then(() => {
    console.log('Password is reset. Check your e-mail!');
    })
    .catch((error) => {
            console.error('Error sending reset password e-mail, ', error.message);
            alert(error.message);
    })

    document.getElementById('resetfeedback').innerHTML = "Your password is reset. Please check your e-mail."
    emailtoreset.value = "";
    emailtoreset.focus();
    noreset.style.display = "none";
});

