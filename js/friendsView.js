// ********************************************************************************************
// *************** This page is the code related to friend's names and gift list **************
// ********************************************************************************************

console.log("Connected to friendsView.js");

// *************************** global variables used in the script ****************************

const friendsFooter = document.querySelector("#friendsFooter");
const friendsSeeList = document.querySelector("#friendsSeeList");
const friendsWishlist = document.querySelector("#friendsWishlist");
const giftcardFriendsDisplay = document.querySelector("#giftcardFriendsDisplay");
const editCardFriends = document.querySelector('#editCardFriends');
const saveEditFriendsBtn = document.querySelector('#saveEditFriends');
const deleteWishFriendsBtn = document.querySelector('#deleteWishFriends');


let friendID;

async function friendsListfromDB() {

  friendsSeeList.innerHTML = "";

  let mainUser = JSON.parse(localStorage.getItem("mainUser"));

  await db
    .collection(mainUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      const list = document.createElement("ul");
      list.setAttribute("id", "fetchedFriendsList");
      querySnapshot.forEach((item) => {
        console.log(item.id, " => ", item.data());

        const listItem = document.createElement("li");
        listItem.innerText = `${item.id}`;
        list.appendChild(listItem);

        const seeListBtn = document.createElement("button");
        seeListBtn.innerText = "See List";
        listItem.appendChild(seeListBtn);
        // listItem.appendChild(friendsWishlist);

        seeListBtn.addEventListener("click", function () {
          friendID = this.parentElement.innerText.slice(0, -8);
          friendsWishlist.classList.remove("hide");
          renderTHISFriendList(friendID);
        });
      });

      friendsSeeList.appendChild(list);
    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

friendsListfromDB();

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
        console.log(item.id, " => ", item.data());
        console.log(item.data().wishTitle);
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";
        // Add the Gift title
        const giftHeader = document.createElement("h3");
        giftHeader.setAttribute("id", item.data().wishTitle);
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
          deleteWishlistItem(docID, item.id);
        });

        // Editing an item
        // Editing Title
        const editTitleBtn = document.createElement("button");
        editTitleBtn.innerText = "Edit Title";
        card.appendChild(editTitleBtn);
        editTitleBtn.addEventListener("click", () => {
          editWishTitle(docID, item, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editTitleBtn.classList.toggle("hide");
        });
        // Editing Description
        const editDescBtn = document.createElement("button");
        editDescBtn.innerText = "Edit Desc";
        card.appendChild(editDescBtn);
        editDescBtn.addEventListener("click", () => {
          editWishDesc(docID, item, card);
          // removing the button from UI when edit mode is on, otherwise creates multiple inputs
          editDescBtn.classList.toggle("hide");
        });
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

async function deleteWishlistItem(docID, item) {
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .doc(docID)
    .collection("This Friend's List")
    .doc(item)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  renderFriendsWishlist(docID);
  // renderFriendsWishlist(docID);
}

function editWishTitle(doc, item, card) {
  console.log("line 143" + item.id);
  const editTitleInput = document.createElement('input');
  editTitleInput.setAttribute('type', 'text');
  editTitleInput.classList.add('editTitleInput');
  // editTitleInput.setAttribute('value', `${doc.data().wishTitle}`);
  const doneEditTitleBtn = document.createElement('button');
  doneEditTitleBtn.innerText = 'OK';
  card.appendChild(editTitleInput);
  card.appendChild(doneEditTitleBtn);

  doneEditTitleBtn.addEventListener('click', async function () {
    console.log(editTitleInput);
    console.log(item.id);
    let obj = { wishTitle: editTitleInput.value };
    //   let userTitleEdit = { wishTitle: editTitleInput.value };
    await db.collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(doc)
      .collection("This Friend's List")
      .doc(item.id)
      .update(
        obj
      ).then(() => {
        console.log("document updated!")
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    renderTHISFriendList(doc, item.id);
  })
}

function editWishDesc(doc, item, card) {
  const editDescInput = document.createElement('input');
  editDescInput.setAttribute('type', 'text');
  editDescInput.classList.add('editDescInput');
  //   editDescInput.setAttribute('value', `${doc.data().wishDesc}`);
  const doneEditDescBtn = document.createElement('button');
  doneEditDescBtn.innerText = 'OK';
  card.appendChild(editDescInput);
  card.appendChild(doneEditDescBtn);

  doneEditDescBtn.addEventListener('click', async function () {
    // let userDescEdit = {  };
    await db.collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(doc)
      .collection("This Friend's List")
      .doc(item.id)
      .update({
        wishDesc: editDescInput.value
      }).then(() => {
        console.log("document updated!")
        console.log(item.id);
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    renderTHISFriendList(doc, item.id);
  })
}

let storageRef = storage.ref();
async function renderTHISFriendList(friendID) {

  friendsWishlist.innerHTML = "";

  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .doc(friendID)
    .collection("This Friend's List")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((item) => {
        console.log(item.id, " => ", item.data());
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";

        // Add the Gift title
        const giftHeader = document.createElement("h3");
        giftHeader.innerText = `${item.data().wishTitle}`;
        card.appendChild(giftHeader);
        // Add the image / photo here
        //Image
        if (item.data().storeImage != "") {
          const theImage = document.createElement("img");
          storageRef
            .child(`images/${item.data().storeImage}`)
            .getDownloadURL()
            .then((url) => {
              theImage.src = url;
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          card.appendChild(theImage);
        }
        // Add the Gift description to the card
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createTextNode(
          `${item.data().wishDesc}`
        );
        descriptionContainer.appendChild(descriptionText);
        card.appendChild(descriptionContainer);

        friendsWishlist.appendChild(card);

        // Editing an item
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList = "editButton";
        editBtn.innerText = "Edit/Delete";
        card.appendChild(editBtn);
        editBtn.addEventListener("click", async function () {
          console.log("Edit Button Clicked");
          editWish(item);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

async function renderFriendWishlist() {
  giftcardFriendsDisplay.innerHTML = `<h2> My List </h2>`;
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("MyWishlist")
    .collection("List of items")
    .where("mine", "==", true)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("rendering the items");
        // Create the card container
        const card = document.createElement("div");
        card.className = "displaycard";

        // Add the Gift title
        const giftHeader = document.createElement("h3");
        giftHeader.innerText = `${doc.data().wishTitle}`;
        card.appendChild(giftHeader);
        // Add the image / photo here
        //Image
        if (doc.data().storeImage != "") {
          const theImage = document.createElement("img");
          storageRef
            .child(`images/${doc.data().storeImage}`)
            .getDownloadURL()
            .then((url) => {
              theImage.src = url;
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          card.appendChild(theImage);
        }
        // Add the Gift description to the card
        const descriptionContainer = document.createElement("div");
        const descriptionText = document.createTextNode(
          `${doc.data().wishDesc}`
        );
        descriptionContainer.appendChild(descriptionText);
        card.appendChild(descriptionContainer);

        giftcardFriendsDisplay.appendChild(card);

        // Editing an item
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList = "editButton";
        editBtn.innerText = "Edit/Delete";
        card.appendChild(editBtn);
        editBtn.addEventListener("click", async function () {
          console.log("Edit Button Clicked");
          editWish(doc);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// ******************************* Editing Wishes on user list ********************************

function editWish(doc) {
  console.log('inside EditWish')
  editCardFriends.classList.remove("hide");
  giftcardFriendsDisplay.classList.add('hide');

  wishTitleEdit.value = `${doc.data().wishTitle}`;
  wishDescEdit.value = `${doc.data().wishDesc}`;

  saveEditFriendsBtn.addEventListener("click", async function () {
    console.log("saveEdit Button Clicked");
    let wishEdited = {
      wishTitle: wishTitleEdit.value,
      wishDesc: wishDescEdit.value,
    };
    // editCardFriends.classList.add('hide');
    // renderWishlist();
    // giftcardFriendsDisplay.classList.remove('hide');
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendID)
      .collection("This Friend's List")
      .doc(doc.id)
      .update({ ...wishEdited });

    editCardFriends.classList.add("hide");
    friendsWishlist.innerHTML = "";
    renderTHISFriendList();
    giftcardFriendsDisplay.classList.remove("hide");
  });

  deleteWishFriendsBtn.addEventListener("click", async function () {
    console.log("Delete Button Clicked");
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendID)
      .collection("This Friend's List")
      .doc(doc.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    editCardFriends.classList.add("hide");
    friendsWishlist.innerHTML = "";
    renderTHISFriendList();
    giftcardFriendsDisplay.classList.remove("hide");
  });
}
