"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

console.log('ADDGIFTS.JS CONNECTED')



addGift.addEventListener('click', async function addToFirestore() {

    await db.collection(auth.currentUser.uid).doc('wishes').collection('List of items').doc('gift idea one').set({
        // username: this.username,
        userID: auth.currentUser.uid,
        giftTitle: giftTitle.value,
        giftDescription: giftDescription.value,
    
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
})


// The following example shows how to retrieve the contents of a single document using get():
var docRef = db.collection(auth.currentUser.uid).doc();

docRef.get()
    .then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
});