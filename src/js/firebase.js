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

    //Get the currently signed in user (whether logged in or not)
    firebase.auth().onAuthStateChanged((user) => {
        let notLoggedIn = document.getElementById('not-logged-in');
        let loggedIn = document.getElementById('logged-in');
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            loggedIn.style.display = 'block';
            notLoggedIn.style.display = 'none';

        // Get User Profile
        const user = firebase.auth().currentUser;
            if (user !== null) {
              // The user object has basic properties such as display name, email, etc.
            // Part of registration form 
            // const displayName = user.displayName;
              const email = user.email;
              document.getElementById('user_para').innerHTML = "Welcome User : " + email;
            }

            } else {
                loggedIn.style.display = 'none';
                notLoggedIn.style.display = 'block';
            }
      });

    document.getElementById("btn_login").addEventListener("click", () => {
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

    document.getElementById("btn_logout").addEventListener("click", () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
          document.getElementById('email1').value = "";
          document.getElementById('password1').value = "";
          document.getElementById('email1').focus();
    }) 