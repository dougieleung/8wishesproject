// const { create } = require("domain");
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
let newFriend;

class addFriendClass {
  constructor(friendName, friendEvent, friendDate) {
    (this.friendName = friendName),
      (this.friendEvent = friendEvent),
      (this.friendDate = friendDate);
  }
}

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
  } else {
    createEvent.style.display = "none";
  }
});

addFriendBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    friendName.value.trim() &&
    friendEventSelect.value !== "Other" &&
    friendDate.value.trim()
  ) {
    newFriend = new addFriendClass(
      friendName.value.trim(),
      friendEventSelect.value,
      friendDate.value.trim()
    );
  } else if (friendEventSelect.value === "Other") {
    newFriend = new addFriendClass(
      friendName.value.trim(),
      document.querySelector("#inputOther").value.trim(),
      friendDate.value.trim()
    );
  } else {
    alert("all fields are mandatory!");
  }
});
