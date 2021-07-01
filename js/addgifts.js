


addGift.addEventListener('click', async function addToFirestore() {

    await db.collection(firebase.auth().currentUser.uid).doc().set({
        // username: this.username,
        userID: firebase.auth().currentUser.uid,
        giftTitle: giftTitle.value,
        // description: 
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

})


// The following example shows how to retrieve the contents of a single document using get():
db.collection("cities").doc("SF");

docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});