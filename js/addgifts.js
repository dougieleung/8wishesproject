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
const editCard = document.querySelector("#editCard");
const wishTitleEdit = document.querySelector("#wishTitleEdit");
const wishDescEdit = document.querySelector("#wishDescEdit");
const saveEditBtn = document.querySelector("#saveEdit");
const deleteWishBtn = document.querySelector("#deleteWish");
const seeFullListLink = document.querySelector("#seeFullList");

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

    complete.classList.toggle('hide');
    displayGift.classList.toggle('hide')

    displayGift.innerHTML = `<h2> My List </h2>`;

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

async function renderWishlist() {
  displayGift.innerHTML = `<h2> My List </h2>`;
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
        // heading:
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
        // const deleteBtn = document.createElement("button");
        // deleteBtn.setAttribute = ("type", "button");
        // deleteBtn.innerText = "Delete";
        // card.appendChild(deleteBtn);
        displayGift.appendChild(card);
        // deleteBtn.addEventListener("click", () => {
        //   deleteWishlistItem(doc.id);
        // });

        // Editing an item
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.classList = 'editButton'
        editBtn.innerText = "Edit/Delete";
        card.appendChild(editBtn);
        editBtn.addEventListener('click', async function () {
          editWish(doc);
        })


      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

function editWish(doc) {
  editCard.classList.remove('hide');
  displayGift.classList.add('hide');

  wishTitleEdit.value = `${doc.data().wishTitle}`;
  wishDescEdit.value = `${doc.data().wishDesc}`

  saveEditBtn.addEventListener('click', async function () {
    let wishEdited = {
      wishTitle: wishTitleEdit.value,
      wishDesc: wishDescEdit.value,
    };
    // editCard.classList.add('hide');
    // renderWishlist();
    // displayGift.classList.remove('hide');
    await db.collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .update({ ...wishEdited });
    editCard.classList.add('hide');
    renderWishlist();
    displayGift.classList.remove('hide');

  })
  deleteWishBtn.addEventListener('click', async function () {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    editCard.classList.add('hide');
    renderWishlist();
    displayGift.classList.remove('hide');
  });
}

// async function deleteWishlistItem(docID) {
//   await db
//     .collection(firebase.auth().currentUser.uid)
//     .doc("MyWishlist")
//     .collection("List of items")
//     .doc(docID)
//     .delete()
//     .then(() => {
//       console.log("Document successfully deleted!");
//       editCard.classList.toggle('hide');
//       renderWishlist();
//       displayGift.classList.toggle('hide');
//     })
//     .catch((error) => {
//       console.error("Error removing document: ", error);
//     });

// }



// function editWishDesc(doc, card) {
//   const editDescInput = document.createElement('input');
//   editDescInput.setAttribute('type', 'text');
//   editDescInput.classList.add('editDescInput');
//   editDescInput.setAttribute('value', `${doc.data().wishDesc}`);
//   const doneEditDescBtn = document.createElement('button');
//   doneEditDescBtn.innerText = 'OK';
//   card.appendChild(editDescInput);
//   card.appendChild(doneEditDescBtn);

//   doneEditDescBtn.addEventListener('click', async function () {
//     let userDescEdit = { wishDesc: editDescInput.value };
//     await db.collection(firebase.auth().currentUser.uid)
//       .doc("MyWishlist")
//       .collection("List of items")
//       .doc(doc.id)
//       .update({ ...userDescEdit });
//     renderWishlist();
//   })
// }