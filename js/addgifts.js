// ********************************************************************************************
// ********** This page is the code for adding gift idea to user or to friend's list **********
// ********************************************************************************************

// ************* global variables used in the script *************

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

// ************ create wish idea object through class ************


class newWishObject {
  constructor(title, description, image, timestamp) {
    this.wishTitle = title;
    this.wishDesc = description;
    this.storeImage = image;
    this.timestamp = timestamp;
  }
}

let newWish = {};

// ********** #2 Add Gift Idea Section of gift_idea.html **********


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

// ****** #4 Gift Idea Summary Card section of gift_idea.html ******
// ************************ Add location ***************************

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

// ****** #5 (A) Add to My Wishlist or (B) Friend's List Page ******

addToWish.addEventListener("click", () => {

  addWishMsg.innerHTML = "";
  newWish.mine = true;
  addToWishlistSection.classList.remove('show');
  addToWishlistSection.classList.add('hide');
  complete.classList.toggle('hide');
  if (newWish.location !== undefined) {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  } else {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}`;
  }

});

const friendEventAdded = document.querySelector("#friendEventAdded");

// ************************ #2 Create (Other) New Event input field *********************

friendEventSelect2.addEventListener("change", () => {
  if (friendEventSelect2.value === "Other") {
    createEvent2.innerHTML = "";
    createEvent2.style.display = "block";
    const inputEl = document.createElement("input");
    inputEl.setAttribute("id", "inputOther");
    inputEl.setAttribute("type", "text");
    const labelEl = document.createElement("label");
    labelEl.innerText = "Create Event";
    labelEl.setAttribute("for", "Other");
    createEvent2.appendChild(labelEl);
    createEvent2.appendChild(inputEl);
    createEventInput = document.querySelector("#inputOther");
  } else {
    createEvent2.style.display = "none";
  }
});

// **** #7 (B) IF Friends, add Event to newWish Obj and Firestore ****

addEventBtn.addEventListener("click", () => {

    newWish.eventName = createEventInput.value;
    newWish.eventDate = friendDate2.value;
    console.log(newWish);
    createEventInput.value = "";
    friendDate2.value = "";

    addIdeaToCollection(friendsProfile.value, newWish.wishTitle);
    friendEventAdded.innerHTML = `Successfully added:
    <p> ${newWish.eventName} on ${newWish.eventDate} for ${friendsProfile.value}`;
});

// ********** Add Gift Idea to Firestore and retrieve list ************

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

    // See L216 Function
    renderWishlist();
  }
});

// ********** Lists out the friend's names from Firestore ************

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
          
          // See L185 Function
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

// ********** Add Gift Idea to Friend's Collection of ideas ************

async function addIdeaToCollection(friendsName, giftTitle) {
  console.log("Event Listener Triggered! ");

  // if (firebase.auth().currentUser === null) {
  //   logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  // } else {
  //   ideaAddedMsg.innerHTML = "Your idea is added!";

    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendsName)
      .collection("This Friend's List")
      .doc(giftTitle)
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

// ********** Outputs the list of gift ideas belonging to User ************

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
          // See L274 Editing Wish
          editWish(doc);
        })
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// ***************** Editing Wishes on user list *******************

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