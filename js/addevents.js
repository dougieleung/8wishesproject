"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

console.log('ADDEVENTS.JS CONNECTED')



addEvent.addEventListener('click', async function updateEventDetails () {

    await db.collection(auth.currentUser.uid).doc('wishes').collection('List of items').doc('gift idea one').update ({

        eventName: eventName.value,
        dateOfEvent: dateOfEvent.value,
    })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

    var giftRef = db.collection(auth.currentUser.uid).doc('wishes').collection('List of items').doc('gift idea one');

    var setWithMerge = giftRef.set({
    }, { merge: true });

})