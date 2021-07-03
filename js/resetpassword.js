// ************************** RESET USER PASSWORD *****************************

resetPassword.addEventListener('click', () => {

    firebase.auth().sendPasswordResetEmail(emailtoreset.value)
    .then(() => {
    alert('Password is reset. Check your e-mail!');
    })
    .catch((error) => {
            console.error('Error sending reset password e-mail, ', error.message);
            alert(error.message);
    })
});