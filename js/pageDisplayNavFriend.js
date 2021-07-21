const giftIdeaHomePage = document.querySelector('#giftIdeaHomePage');
const addAFriendBtn2 = document.querySelector('#addAFriendBtn2');
const addFriendPage2 = document.querySelector('#addFriendPage2');
const friendName = document.querySelector("#friendName");
const friendEventSelect = document.querySelector("#friendEventSelect");
const createEvent = document.querySelector("#createEvent");
const friendDate = document.querySelector("#friendDate");
const addFriendBtn = document.querySelector("#addFriendBtn");
const mainFriendsPage = document.querySelector("#mainFriendsPage");

addAFriendBtn2.addEventListener('click', () => {

    mainFriendsPage.classList.remove('show');
    mainFriendsPage.classList.add('hide');
    addFriendPage2.classList.toggle('hide');
    
})

// *************************** Create Friends Obj via class ************************

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
