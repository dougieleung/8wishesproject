// START CREATING AN OBJECT FOR THE WISH
class newWishObject {
  constructor(title, desc, image, timestamp) {
    this.wishTitle = title;
    this.wishDesc = desc;
    this.storeImage = image;
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
      storeimage = storeImage,
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
  addToWishlistSection.classList.add('hide');
  addToWishlistSection.classList.remove('show');
  complete.classList.toggle('hide');
  if (newWish.location !== undefined) {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  } else {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}`;
  }
  // addWishMsg.innerHTML =
  //   'You have added the idea to your own wishlist!';
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
  // ideaAddedMsg.innerHTML = "";

  if (firebase.auth().currentUser === null) {
    logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  } else if (newWish.mine) {
    // ideaAddedMsg.innerHTML = "Your idea is added!";

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

async function friendsListfromDB() {
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
}

// nextToWishlists.addEventListener("click", friendsListfromDB);

nextToWishlists.addEventListener("click", () => {
  newWish.location = mapLink.href;

  if (newWish.location !== undefined) {
    windowDescription.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  } else {
    windowDescription.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}`;
  }
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
  displayGift.innerHTML = "";
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("MyWishlist")
    .collection("List of items")
    .where("mine", "==", true)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";
        // Add the Gift title
        const giftHeader = document.createElement("h3");
        giftHeader.innerText = `${doc.data().wishTitle}`;
        card.appendChild(giftHeader);
        // Add the image / photo here
        // Add the Gift description to the card
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createTextNode(
          `${doc.data().wishDesc}`
        );
        descriptionContainer.appendChild(descriptionText);
        card.appendChild(descriptionContainer);
        // Deleting an item
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute = ("type", "button");
        deleteBtn.innerText = "Delete";
        card.appendChild(deleteBtn);
        displayGift.appendChild(card);
        deleteBtn.addEventListener("click", () => {
          deleteWishlistItem(doc.id);
        });

        // Editing an item
        // Editing Title
        const editTitleBtn = document.createElement('button');
        editTitleBtn.innerText = "Edit Title";
        card.appendChild(editTitleBtn);
        editTitleBtn.addEventListener('click', () => {
          editWishTitle(doc, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editTitleBtn.classList.toggle('hide');
        })
        // Editing Description
        const editDescBtn = document.createElement('button');
        editDescBtn.innerText = "Edit Desc";
        card.appendChild(editDescBtn);
        editDescBtn.addEventListener('click', () => {
          editWishDesc(doc, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editDescBtn.classList.toggle('hide');
        })

      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function editWishTitle(doc, card) {
  const editTitleInput = document.createElement('input');
  editTitleInput.setAttribute('type', 'text');
  editTitleInput.classList.add('editTitleInput');
  editTitleInput.setAttribute('value', `${doc.data().wishTitle}`);
  const doneEditTitleBtn = document.createElement('button');
  doneEditTitleBtn.innerText = 'OK';
  card.appendChild(editTitleInput);
  card.appendChild(doneEditTitleBtn);

  doneEditTitleBtn.addEventListener('click', async function () {
    let userTitleEdit = { wishTitle: editTitleInput.value };
    await db.collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .update({ ...userTitleEdit });
    renderWishlist();
  })
}

function editWishDesc(doc, card) {
  const editDescInput = document.createElement('input');
  editDescInput.setAttribute('type', 'text');
  editDescInput.classList.add('editDescInput');
  editDescInput.setAttribute('value', `${doc.data().wishDesc}`);
  const doneEditDescBtn = document.createElement('button');
  doneEditDescBtn.innerText = 'OK';
  card.appendChild(editDescInput);
  card.appendChild(doneEditDescBtn);

  doneEditDescBtn.addEventListener('click', async function () {
    let userDescEdit = { wishDesc: editDescInput.value };
    await db.collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .update({ ...userDescEdit });
    renderWishlist();
  })
}