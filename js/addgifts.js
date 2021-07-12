// START CREATING AN OBJECT FOR THE WISH
class newWishObject {
  constructor(title, desc, timestamp) {
    this.wishTitle = title;
    this.wishDesc = desc;
    this.timestamp = timestamp;
  }
}

const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDesc");
const displayGift = document.querySelector("#giftcard_display");
const windowDescription = document.querySelector("#windowDescription");

let newWish;
addGift.addEventListener("click", () => {
  if (giftTitle.value.trim() && giftDescription.value.trim()) {
    newWish = new newWishObject(
      giftTitle.value.trim(),
      giftDescription.value.trim(),
      new Date()
    );

    console.log(newWish);
    displayTitle.innerHTML = `${giftTitle.value}`;
    displayDescription.innerHTML = `${giftDescription.value}`;
    giftTitle.value = "";
    giftDescription.value = "";
  } else {
    alert("All fields are mandatory!");
  }
});

addToWish.addEventListener("click", () => {
  addWishMsg.innerHTML = "";
  newWish.mine = true;
  addWishMsg.innerHTML =
    'You have added the idea to your own wishlist! Please click "Next" to see your list!';
});

// addToFriend.addEventListener("click", () => {
//   newWish.mine = false;
//   addWishMsg.innerHTML =
//     'You have added the idea to your friend! Please click "Next" to add an event to it!';
// });

// nextToEvents.addEventListener("click", () => {
//   if (eventName.value.trim() && eventDate.value) {
//     newWish.eventName = eventName.value;
//     newWish.eventDate = eventDate.value;
//     console.log(newWish);
//     eventName.value = "";
//     eventDate.value = "";
//   } else {
//     alert("All fields are mandatory!");
//   }
// });

//  ADD GIFT ITEM TO DB AND RETRIEVE LIST IN ORDER OF TIMESTAMP AND PERSON

addToDB.addEventListener("click", async function addToFirestore() {
  logintoadd.innerHTML = "";
  ideaAddedMsg.innerHTML = "";

  if (firebase.auth().currentUser === null) {
    logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  } else if (newWish.mine) {
    ideaAddedMsg.innerHTML = "Your idea is added!";

    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(newWish.wishTitle)
      .set({
        ...newWish,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    displayGift.innerHTML = "";

    renderWishlist();
  }
});

nextToWishlists.addEventListener("click", async function friendsListfromDB() {
  console.log("friends list summary!");
  friendsList.innerHTML = "";
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      const list = document.createElement("ul");
      list.setAttribute("id", "fetchedFriendsList");
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());

        const listItem = document.createElement("li");
        listItem.setAttribute("id", `${doc.id}`);

        const buttonItem = document.createElement("button");
        buttonItem.setAttribute("type", "button");
        buttonItem.addEventListener("click", () => {
          addIdeaToCollection(doc.id);
        });

        const friendsNames = document.createTextNode(`${doc.id}`);
        buttonItem.appendChild(friendsNames);
        listItem.appendChild(buttonItem);
        list.appendChild(listItem);
      });

      friendsList.appendChild(list);
    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });
});

nextToWishlists.addEventListener("click", () => {
  newWish.location = mapLink.href;
  windowDescription.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  console.log(newWish);
});

async function addIdeaToCollection(friendsName) {
  console.log("Event Listener Triggered! ");

  if (firebase.auth().currentUser === null) {
    logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  } else {
    ideaAddedMsg.innerHTML = "Your idea is added!";

    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendsName)
      .collection("This Friend's List")
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
}
async function deleteWishlistItem(docID) {
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("MyWishlist")
    .collection("List of items")
    .doc(docID)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      renderWishlist();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  displayGift.innerHTML = "";
}

async function renderWishlist() {
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("MyWishlist")
    .collection("List of items")
    .where("mine", "==", true)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";
        // Add the Gift title
        const giftHeader = document.createElement("h3");
        const giftHeaderText = document.createTextNode(
          `${doc.data().wishTitle}`
        );
        giftHeader.appendChild(giftHeaderText);
        card.appendChild(giftHeader);
        // Add the image / photo here
        // Add the Gift description to the card
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createTextNode(
          `${doc.data().wishDesc}`
        );
        descriptionContainer.appendChild(descriptionText);
        card.appendChild(descriptionContainer);
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute = ("type", "button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
          deleteWishlistItem(doc.id);
        });
        card.appendChild(deleteBtn);

        displayGift.appendChild(card);
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
