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
