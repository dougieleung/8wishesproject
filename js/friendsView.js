// ********************************************************************************************
// *************** This page is the code related to friend's names and gift list **************
// ********************************************************************************************

'use strict';

console.log("Connected to friendsView.js");

// *************************** global variables used in the script ****************************

const friendsFooter = document.querySelector("#friendsFooter");
const friendsSeeList = document.querySelector("#friendsSeeList");
const friendsWishlist = document.querySelector("#friendsWishlist");
const giftcardFriendsDisplay = document.querySelector("#giftcardFriendsDisplay");
const editCardFriends = document.querySelector('#editCardFriends');
const saveEditFriendsBtn = document.querySelector('#saveEditFriends');
const deleteWishFriendsBtn = document.querySelector('#deleteWishFriends');
const addFriendPage2 = document.querySelector("#addFriendPage2");
const addFriendBtn2 = document.querySelector("#addFriendBtn2");
const addFriendButton = document.querySelector("#addFriendButton");
const addFriendForm = document.querySelector(".addFriendForm");
const emptyFriendsList = document.querySelector(".emptyFriendsList");
const loadingFriendsList = document.querySelector(".loadingFriendsList");
const friendsListHeading = document.querySelector("#friendsListHeading");
let friendID;

// ***************** Function #1: Retrieve list of friends from Firestore *********************

async function friendsListfromDB() {

  let mainUser = JSON.parse(localStorage.getItem("mainUser"));

  if (mainUser === null) {
    emptyFriendsList.style.display = "block";
    emptyFriendsList.style.textAlign = "center";
    loadingFriendsList.style.display = "none";
    addFriendButton.style.display = "none";

  } else {
    friendsSeeList.classList.remove('hide');

  }

  await db
    .collection(mainUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {

      friendsSeeList.innerHTML = "";
      const list = document.createElement("ul");
      list.setAttribute("id", "fetchedFriendsList");

      querySnapshot.forEach((item) => {

        console.log(item.id, " => ", item.data());
        const container = document.createElement("div");
        container.setAttribute("class", "nameContainer");
        const listItem = document.createElement("li");
        const nameItem = document.createElement("span");
        nameItem.innerText = `${item.id}`;
        list.appendChild(listItem);

        const seeListBtn = document.createElement("button");
        seeListBtn.innerText = "See List";
        listItem.appendChild(container);
        container.appendChild(nameItem);
        container.appendChild(seeListBtn);

        seeListBtn.addEventListener("click", function () {
          friendID = nameItem.innerText;
          friendsListHeading.classList.add('hide');
          friendsSeeList.classList.add('hide');
          addFriendButton.classList.add('hide');
          friendsWishlist.classList.remove("hide");

          // Please see Function #2
          renderTHISFriendList(friendID);
        });
      });

      friendsSeeList.appendChild(list);
    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
// Call the function so when we navigate to friendsView.html, the list of friends are shown.
friendsListfromDB();

// ****************** Function #2: Retrieve list of gift ideas for Friends ********************

let storageRef = storage.ref();

async function renderTHISFriendList() {

  friendsWishlist.innerHTML = `<h1>${friendID}'s List</h1>`;

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
        editBtn.innerHTML = `<i class="fas fa-ellipsis-v"></i>`;
        card.appendChild(editBtn);
        editBtn.addEventListener("click", async function () {
          console.log("Edit Button Clicked");

          // Please see #3 Function
          editWish(item);
        });
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// ********************* Function #3: Editing Wishes on user list *****************************

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

    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendID)
      .collection("This Friend's List")
      .doc(doc.id)
      .update({ ...wishEdited });

    location.reload();
  });

  // ********************* Function #4: Deleting Wishes from user list **************************

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

    location.reload();
  });
}

// ********************** Event Listener: Adding Friends to Firestore *************************

addFriendBtn2.addEventListener("click", () => {

  // Converting every word for name to UpperCase Letter
  const friendsName = friendName2.value
    .trim()
    .toLowerCase()
    .split(" ")
    .map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.substring(1))
    .join(" ");

  addFriendToFirestore(friendsName);

});

// *********************** Function #5: Adding Friends to Firestore ***************************

async function addFriendToFirestore(friendName) {
  const friendsArray = [];

  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        friendsArray.push(doc.id);
        console.log(friendsArray);
      });
    });
  if (friendsArray.length === 0) {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(friendName)
      .set({
        friendName: friendName
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    friendName2.value = "";
    location.href = "friendsView.html";

  } else {
    if (friendsArray.length !== 0) {
      for (let i = 0; i < friendsArray.length; i++) {
        if (friendName !== friendsArray[i]) {
          await db
            .collection(firebase.auth().currentUser.uid)
            .doc("Friends")
            .collection("List")

            .doc(friendName)
            .set({
              friendName: friendName
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          friendName2.value = "";
          location.href = "friendsView.html";

        } else {
          alert("Friend already exists!");
        }
      }
    }
  }
}

addFriendButton.addEventListener("click", () => {
  addFriendForm.style.display = "block";
})