// START CREATING AN OBJECT FOR THE WISH
class newWishObject {
  constructor (title, desc, timestamp) {
    this.wishTitle = title;
    this.wishDesc = desc;
    this.timestamp = timestamp;
  }
  toString() {
    return this.wishTitle + ', ' + this.wishDesc + ', ' + this.timestamp;
  }
}

const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDesc");
const displayGift = document.querySelector('#giftcard_display');

let newWish;
addGift.addEventListener("click", () => {
  if (giftTitle.value.trim() && giftDescription.value.trim()) {
    newWish = new newWishObject(
      giftTitle.value.trim(),
      giftDescription.value.trim(),
      new Date()
    );
    displayTitle.innerHTML = `${giftTitle.value}`;
    displayDescription.innerHTML = `${giftDescription.value}`;
    giftTitle.value = "";
    giftDescription.value = "";
  } else {
    alert("All fields are mandatory!");
  }
});

addToWish.addEventListener("click", () => {
  newWish.mine = true;
});

addToFriend.addEventListener("click", () => {
  newWish.mine = false;
});

addEventBtn.addEventListener("click", () => {
  if (eventName.value.trim() && dateOfEvent.value) {
    newWish.eventName = eventName.value;
    newWish.eventDate = dateOfEvent.value;
    console.log(newWish);
    eventName.value = "";
    dateOfEvent.value = "";
  } else {
    alert("All fields are mandatory!");
  }
});

//  ADD GIFT ITEM TO DB AND RETRIEVE LIST IN ORDER OF TIMESTAMP AND PERSON
addToDB.addEventListener("click", async function addToFirestore() {
  console.log("KEEP CALM AAAAANDDDD ..... Adding to FIRESTORE");
  if (newWish.mine) {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc()
      .set({
        ...newWish,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

// Get the data back from DB for MINE in TIMESTAMP ORDER

      await db
      .collection(firebase.auth().currentUser.uid)
      .doc('MyWishlist')
      .collection('List of items')
      .where("mine", "==", true)
      .orderBy("timestamp")
      .get()
      .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

    // Create the card container
    const card = document.createElement('div');
    card.className = 'displaycard';
    // Add the Gift title
    const giftHeader = document.createElement('h3');
    const giftHeaderText = document.createTextNode(`${doc.data().wishTitle}`); 
    giftHeader.appendChild(giftHeaderText);
    card.appendChild(giftHeader);
  
    // Add the image / photo here

    // Add the Gift description to the card
    const descriptionContainer = document.createElement('div');
    const descriptionText = document.createTextNode(`${doc.data().wishDesc}`);
    descriptionContainer.appendChild(descriptionText);
    card.appendChild(descriptionContainer);

    // Add the Event name to the card
    const eventHeader = document.createElement('p');
    const eventHeaderText = document.createTextNode(`${doc.data().eventName}`); 
    eventHeader.appendChild(eventHeaderText);
    card.appendChild(eventHeader);

    // Add the Event date to the card
    const eventDate = document.createElement('p');
    const eventDateText = document.createTextNode(`${doc.data().eventDate}`); 
    eventDate.appendChild(eventDateText);
    card.appendChild(eventDate);

    // Add the card to the page
    displayGift.appendChild(card);

      });
      })
      .catch((error) => {
          console.log("Error getting document:", error);
      });

  } else {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc()
      .set({
        ...newWish,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
});


