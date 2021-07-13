console.log("Friends JS Connected!");


let createEventInput, newFriend;
const friendsWishlist = document.querySelector('#friendsWishlist');

class addFriendClass {
  constructor(friendName, friendEvent, friendDate) {
    (this.friendName = friendName),
      (this.friendEvent = friendEvent),
      (this.friendDate = friendDate);
  }
  resetInputs() {
    friendName.value = "";
    friendEventSelect.value = "resetOptions";
    friendDate.value = "";
    if (createEventInput) {
      createEventInput.value = "";
      createEvent.style.display = "none";
    }
    friendName.focus();
  }
}

// Creating a New Event (Other)
friendEventSelect.addEventListener("change", () => {
  if (friendEventSelect.value === "Other") {
    createEvent.innerHTML = "";
    createEvent.style.display = "block";
    const inputEl = document.createElement("input");
    inputEl.setAttribute("id", "inputOther");
    inputEl.setAttribute("type", "text");
    const labelEl = document.createElement("label");
    labelEl.innerText = "Create Event";
    labelEl.setAttribute("for", "Other");
    createEvent.appendChild(labelEl);
    createEvent.appendChild(inputEl);
    createEventInput = document.querySelector("#inputOther");
  } else {
    createEvent.style.display = "none";
  }
});

// Add Friend
addFriendBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    friendName.value.trim() &&
    friendEventSelect.value !== "resetOptions" &&
    friendEventSelect.value !== "Other" &&
    friendDate.value
  ) {
    newFriend = new addFriendClass(
      friendName.value.trim(),
      friendEventSelect.value,
      friendDate.value.trim()
    );
    newFriend.resetInputs();
    addFriendToFirestore(newFriend.friendName, newFriend);
    console.log("added to Firestore");
  } else if (
    friendEventSelect.value === "Other" &&
    friendDate.value &&
    createEventInput.value.trim()
  ) {
    newFriend = new addFriendClass(
      friendName.value.trim(),
      createEventInput.value.trim(),
      friendDate.value
    );
    newFriend.resetInputs();

    addFriendToFirestore(newFriend.friendName, newFriend);
    console.log("added to Firestore");
  } else {
    alert("all fields are mandatory!");
  }

});

async function addFriendToFirestore(friendsName, friendsObject) {

  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .doc(friendsName)
    .set({
      ...friendsObject,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });

}

let friendID;
fetchFriendsBtn.addEventListener("click", async function friendsListfromDB() {
  console.log("addfriend button working");
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc('Friends')
    .collection('List')
    .get()
    .then((querySnapshot) => {
      const list = document.createElement('ul');
      list.setAttribute("id", "fetchedFriendsList");
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        friendID = doc;

        const listItem = document.createElement('li');
        const friendsNames = document.createTextNode(`${doc.id}`);
        listItem.appendChild(friendsNames);
        list.appendChild(listItem);

        const seeListBtn = document.createElement('button');
        seeListBtn.innerText = 'See List';
        listItem.appendChild(seeListBtn);
        listItem.appendChild(friendsWishlist);

        seeListBtn.addEventListener('click', function () {
          friendsWishlist.classList.toggle('hide');
          renderFriendsWishlist(doc);
        })

      });

      FriendsListfromDB.appendChild(list);

    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });

});


async function renderFriendsWishlist(doc) {
  friendsWishlist.innerHTML = "";

  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .doc(doc.id)
    .collection("This Friend's List")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        // console.log(doc.id, " => ", doc.data());
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";
        // Add the Gift title
        const giftHeader = document.createElement("h3");
        giftHeader.innerText = `${item.data().wishTitle}`;
        card.appendChild(giftHeader);
        // Add the image / photo here
        // Add the Gift description to the card
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createTextNode(
          `${item.data().wishDesc}`
        );
        descriptionContainer.appendChild(descriptionText);
        card.appendChild(descriptionContainer);
        // Deleting an item
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute = ("type", "button");
        deleteBtn.innerText = "Delete";
        card.appendChild(deleteBtn);
        friendsWishlist.appendChild(card);
        deleteBtn.addEventListener("click", () => {
          deleteWishlistItem(item.id);
        });

        // Editing an item
        // Editing Title
        const editTitleBtn = document.createElement('button');
        editTitleBtn.innerText = "Edit Title";
        card.appendChild(editTitleBtn);
        editTitleBtn.addEventListener('click', () => {
          editWishTitle(item, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editTitleBtn.classList.toggle('hide');
        })
        // Editing Description
        const editDescBtn = document.createElement('button');
        editDescBtn.innerText = "Edit Desc";
        card.appendChild(editDescBtn);
        editDescBtn.addEventListener('click', () => {
          editWishDesc(item, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editDescBtn.classList.toggle('hide');
        })

      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}


