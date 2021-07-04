console.log("Friends JS Connected!");

// Fetching elements from the DOM
const addFriend = document.querySelector("#addFriend");
const friendName = document.querySelector("#friendName");
const friendEvent = document.querySelector("#friendEvent");
const friendDate = document.querySelector("#friendDate");
const addFriendBtn = document.querySelector("#addFriendBtn");
const friendEventSelect = document.querySelector("#friendEventSelect");
const createEvent = document.querySelector("#createEvent");
const friendAddBtn = document.querySelector("#friendAddBtn");
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
  } else {
    alert("all fields are mandatory!");
  }
});
