console.log("Friends JS Connected!");

const currentUser = firebase.auth().currentUser;

document.onload = function () {
  console.log("Friends page loaded");
  addFriend.addEventListener("click", () => {
    event.preventDefault();
    if (currentUser) {
      alert("please proceed!");
    } else {
      alert("please login first!");
    }
  });
};

let createEventInput, newFriend;

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
    friendName.value.length &&
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
    if (friendsName !== friendsArray[i]) {
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
    } else {
      alert("Friend already exits, Please enter a different name!");
    }
  }
}

fetchFriendsBtn.addEventListener("click", async function friendsListfromDB() {
  FriendsListfromDB.innerHTML = "";
  console.log("addfriend button working");
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
        const friendsNames = document.createTextNode(`${doc.id}`);
        listItem.appendChild(friendsNames);
        list.appendChild(listItem);
      });

      FriendsListfromDB.appendChild(list);
    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });
});
