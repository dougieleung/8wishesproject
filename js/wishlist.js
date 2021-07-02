"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE

console.log('WISHLIST.JS CONNECTED')

// Displaying the gift ideas on the wishlist page
const displayGift = document.querySelector('#giftcard_display');


// I forgot how to reference the current user ID without getting a null error

    var docRef = db.collection('j8ljWFgAEiQEYPhaeZH5caUeZtX2').doc('wishes').collection('List of items').doc('gift idea one');

    // Need the map() code here.

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

    // Add the Gift title
    const giftHeader = document.createElement('h3');
    const giftHeaderText = document.createTextNode(`${docRef.giftTitle}`); 
    giftHeader.appendChild(giftHeaderText);
    displayGift.appendChild(giftHeader);

    // Add the image / photo here

    // Add the Gift description
    const descriptionContainer = document.createElement('div');
    const descriptionText = document.createTextNode(`${docRef.giftDescription}`);
    descriptionContainer.appendChild(descriptionText);
    displayGift.appendChild(descriptionContainer);

    // Add the Event name

    const eventHeader = document.createElement('h4');
    const eventHeaderText = document.createTextNode(`${docRef.eventName}`); 
    eventHeader.appendChild(eventHeaderText);
    displayGift.appendChild(eventHeader);

    // Add the Event date

    const eventDate = document.createElement('p');
    const eventDateText = document.createTextNode(`${docRef.dateOfEvent}`); 
    eventDate.appendChild(eventDateText);
    displayGift.appendChild(eventDate);