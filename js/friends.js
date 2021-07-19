// ********************************************************************************************
// *************** This page is the code related to friend's names and gift list **************
// ********************************************************************************************

console.log("Friends JS Connected!");

// const friendsIntroPageContent = document.querySelector('#friendsIntroPageContent')

// window.addEventListener('load', friendsListfromDB());

const friendListOutput = document.querySelector('#friendListOutput');
const seeFriendsList = document.querySelector('#seeFriendsList');
const friendsProfile = document.querySelector('#friendsProfile');
const friendNameEventContainer = document.querySelector('#friendNameEventContainer');

async function friendsListfromDB() {
  console.log("friends list summary!");
  const friendsListArray = [];
  // friendsIntroPageContent.innerHTML = "";
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc) => {
        
        friendsListArray.push(doc.id);
        console.log(friendsListArray);

      })
    });

    if (friendsListArray.length < 1) {

        const header = document.createElement('h2');
        header.innerText = `Your friend list is empty`;
  
        friendNameEventContainer.style.display = "none";
        friendListOutput.appendChild(header);

    } else {

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
              buttonItem.className="friendBtn";
              buttonItem.addEventListener("click", () => {
                friendsProfile.value = doc.id;
              });
      
              const friendsNames = document.createTextNode(`${doc.id}`);
              buttonItem.appendChild(friendsNames);
              listItem.appendChild(buttonItem);
              list.appendChild(listItem);
            })

            friendListOutput.appendChild(list);

          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
        }
}

// ******* #5(B) of gift_idea.html, "Add To Friend" generates list of friends ******

seeFriendsList.addEventListener('click', friendsListfromDB);

// *************************** Create Friends Obj via class ************************

const friendsWishlist = document.querySelector("#friendsWishlist");
let createEventInput, newFriendObj;

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

// ************** Adding Friend and checking if Friend's Name is in Firestore ***************

addFriendBtn.addEventListener("click", () => {
  // event.preventDefault();


  // Converting every word for name to UpperCase Letter
  const friendsName = friendName.value
    .trim()
    .toLowerCase()
    .split(" ")
    .map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.substring(1))
    .join(" ");

  if (
    friendsName &&
    friendEventSelect.value !== "resetOptions" &&
    friendDate.value
  ) {
    if (friendEventSelect.value === "Other" && createEventInput.value.trim()) {
      newFriendObj = new addFriendClass(
        friendsName,
        createEventInput.value.trim(),
        friendDate.value
      );
    } else {
      newFriendObj = new addFriendClass(
        friendsName,
        friendEventSelect.value,
        friendDate.value
      );
    }
    addFriendToFirestore(friendsName, newFriendObj);
    newFriendObj.resetInputs();

    console.log("added to Firestore");
  } else {
    alert("all fields are mandatory!");
  }
});

async function addFriendToFirestore(friendName, friendObject) {
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

  for (let i = 0; i < friendsArray.length; i++) {
    if (friendName !== friendsArray[i]) {
      await db
        .collection(firebase.auth().currentUser.uid)
        .doc("Friends")
        .collection("List")
        .doc(friendName)
        .set({
          ...friendObject,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    } else {
      alert("Friend already exists!");
    }
  }
}

// ************************ Create (Other) New Event input field *********************

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

// ************************ #2 Create (Other) New Event input field *********************

friendEventSelect2.addEventListener("change", () => {
  if (friendEventSelect2.value === "Other") {
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



// ********  The below code was to build list of friends from button click *********
// ********  We also built the "See List" functionality beside each name ***********
// ********  We added the delete and edit buttons beside each name *****************
// ********  THE WIREFRAME HAS CHANGED SO NEED TO KNOW IF THIS CODE IS REUSABLE ****


let friendID;

// fetchFriendsBtn.addEventListener("click", async function friendsListfromDB() {
//   FriendsListfromDB.innerHTML = "";
//   console.log("addfriend button working");
//   await db
//     .collection(firebase.auth().currentUser.uid)
//     .doc("Friends")
//     .collection("List")
//     .get()
//     .then((querySnapshot) => {
//       const list = document.createElement("ul");
//       list.setAttribute("id", "fetchedFriendsList");
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());

//         const listItem = document.createElement("li");
//         listItem.innerText = `${doc.id}`;
//         list.appendChild(listItem);

//         const seeListBtn = document.createElement("button");
//         seeListBtn.innerText = "See List";
//         listItem.appendChild(seeListBtn);
//         // listItem.appendChild(friendsWishlist);

//         seeListBtn.addEventListener("click", function () {
//           friendID = this.parentElement.innerText.slice(0, -9);
//           friendsWishlist.classList.remove("hide");
//           renderFriendsWishlist(doc);
//         });
//       });

//       FriendsListfromDB.appendChild(list);
//     })

//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });
// });

// async function renderFriendsWishlist(doc) {
//   friendsWishlist.innerHTML = "";

//   await db
//     .collection(firebase.auth().currentUser.uid)
//     .doc("Friends")
//     .collection("List")
//     .doc(doc.id)
//     .collection("This Friend's List")
//     .orderBy("timestamp", "desc")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((item) => {
//         // console.log(doc.id, " => ", doc.data());
//         // Create the card container
//         const card = document.createElement("div");
//         card.className = "displaycard";
//         // Add the Gift title
//         const giftHeader = document.createElement("h3");
//         giftHeader.innerText = `${item.data().wishTitle}`;
//         card.appendChild(giftHeader);
//         // Add the image / photo here
//         // Add the Gift description to the card
//         const descriptionContainer = document.createElement("div");
//         const descriptionText = document.createTextNode(
//           `${item.data().wishDesc}`
//         );
//         descriptionContainer.appendChild(descriptionText);
//         card.appendChild(descriptionContainer);
//         // Deleting an item
//         const deleteBtn = document.createElement("button");
//         deleteBtn.setAttribute = ("type", "button");
//         deleteBtn.innerText = "Delete";
//         card.appendChild(deleteBtn);
//         friendsWishlist.appendChild(card);
//         deleteBtn.addEventListener("click", () => {
//           deleteWishlistItem(item);
//         });

//         // Editing an item
//         // Editing Title
//         const editTitleBtn = document.createElement("button");
//         editTitleBtn.innerText = "Edit Title";
//         card.appendChild(editTitleBtn);
//         editTitleBtn.addEventListener("click", () => {
//           editWishTitle(item, card);
//           // removing the button from UI when edit mode is on, otherwise creates multiple inputs
//           editTitleBtn.classList.toggle("hide");
//         });
//         // Editing Description
//         const editDescBtn = document.createElement("button");
//         editDescBtn.innerText = "Edit Desc";
//         card.appendChild(editDescBtn);
//         editDescBtn.addEventListener("click", () => {
//           editWishDesc(item, card);
//           // removing the button from UI when edit mode is on, otherwise creates multiple inputs
//           editDescBtn.classList.toggle("hide");
//         });
//       });
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });
// }

// async function deleteWishlistItem(item) {
//   await db
//     .collection(firebase.auth().currentUser.uid)
//     .doc("Friends")
//     .collection("List")
//     .doc(friendID)
//     .collection("This Friend's List")
//     .doc(item.id)
//     .delete()
//     .then(() => {
//       console.log("Document successfully deleted!");
//       renderTHISFriendList(friendID);
//     })
//     .catch((error) => {
//       console.error("Error removing document: ", error);
//     });
// }

// async function renderTHISFriendList(friendID) {
//   friendsWishlist.innerHTML = "";

//   await db
//     .collection(firebase.auth().currentUser.uid)
//     .doc("Friends")
//     .collection("List")
//     .doc(friendID)
//     .collection("This Friend's List")
//     .orderBy("timestamp", "desc")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((item) => {
//         console.log(item.id, " => ", item.data());
//         // Create the card container
//         const card = document.createElement("div");
//         card.className = "displaycard";
//         // Add the Gift title
//         const giftHeader = document.createElement("h3");
//         giftHeader.innerText = `${item.data().wishTitle}`;
//         card.appendChild(giftHeader);
//         // Add the image / photo here
//         // Add the Gift description to the card
//         const descriptionContainer = document.createElement("div");
//         const descriptionText = document.createTextNode(
//           `${item.data().wishDesc}`
//         );
//         descriptionContainer.appendChild(descriptionText);
//         card.appendChild(descriptionContainer);
//         // Deleting an item
//         const deleteBtn = document.createElement("button");
//         deleteBtn.setAttribute = ("type", "button");
//         deleteBtn.innerText = "Delete";
//         card.appendChild(deleteBtn);
//         friendsWishlist.appendChild(card);
//         deleteBtn.addEventListener("click", () => {
//           deleteWishlistItem(item);
//         });

//         // Editing an item
//         // Editing Title
//         const editTitleBtn = document.createElement("button");
//         editTitleBtn.innerText = "Edit Title";
//         card.appendChild(editTitleBtn);
//         editTitleBtn.addEventListener("click", () => {
//           editWishTitle(item, card);
//           // removing the button from UI when edit mode is on, otherwise creates multiple inputs
//           editTitleBtn.classList.toggle("hide");
//         });
//         // Editing Description
//         const editDescBtn = document.createElement("button");
//         editDescBtn.innerText = "Edit Desc";
//         card.appendChild(editDescBtn);
//         editDescBtn.addEventListener("click", () => {
//           editWishDesc(item, card);
//           // removing the button from UI when edit mode is on, otherwise creates multiple inputs
//           editDescBtn.classList.toggle("hide");
//         });
//       });
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });
// }


