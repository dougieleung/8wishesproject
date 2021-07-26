// ********************************************************************************************
// *************** This page is the code related to friend's names and gift list **************
// ********************************************************************************************

console.log("Connected to friends.js");

// *************************** global variables used in the script ****************************

const addFriendBtn = document.querySelector("#addFriendBtn");
const friendListOutput = document.querySelector("#friendListOutput");
const seeFriendsList = document.querySelector("#seeFriendsList");
const friendsProfile = document.querySelector("#friendsProfile");
const friendEventSelect = document.querySelector("#friendEventSelect");
const friendNameEventContainer = document.querySelector("#friendNameEventContainer");
const createEvent = document.querySelector("#createEvent");

async function friendsListfromDB() {
  console.log("friends list summary!");
  const friendsListArray = [];
  console.log(firebase.auth().currentUser.uid);
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        friendsListArray.push(doc.id);
        console.log(friendsListArray);
      });
    });

  if (friendsListArray.length < 1) {
    const header = document.createElement("h2");
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
          buttonItem.className = "friendBtn";
          buttonItem.addEventListener("click", () => {
            friendsProfile.value = doc.id;
          });

          const friendsNames = document.createTextNode(`${doc.id}`);
          buttonItem.appendChild(friendsNames);
          listItem.appendChild(buttonItem);
          list.appendChild(listItem);
        });

        friendListOutput.appendChild(list);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
}

// ******* #5(B) of gift_idea.html, "Add To Friend" generates list of friends ******

seeFriendsList.addEventListener("click", friendsListfromDB);

// ********************************* Create Friends Obj via class *****************************

const friendsWishlist = document.querySelector("#friendsWishlist");
let createEventInput, newFriendObj;

class addFriendClass {
  constructor(friendName, friendEvent, friendDate) {
      this.friendName = friendName,
      this.eventName = friendEvent,
      this.eventDate = friendDate
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

// *************** Adding Friend and checking if Friend's Name is in Firestore ****************

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
  if (friendsArray.length === 0) {
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
    if (friendsArray.length !== 0) {
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
  }
}
// ***************************** Create (Other) New Event input field *************************

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
