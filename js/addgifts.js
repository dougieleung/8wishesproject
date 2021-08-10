// ********************************************************************************************
// ********** This page is the code for adding gift ideas to user or to friend's list *********
// ********************************************************************************************


console.log("Connected to addgifts.js");


// *************************** global variables used in the script ****************************


const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDesc");
const windowDescription = document.querySelector("#windowDescription");
const friendEventSelect2 = document.querySelector("#friendEventSelect2");
const createEvent2 = document.querySelector("#createEvent2");
const addEventBtn = document.querySelector("#addEventBtn");


// *************************** create wish idea object through class **************************


class newWishObject {
  constructor(title, description, image, timestamp) {
    this.wishTitle = title;
    this.wishDesc = description;
    this.storeImage = image;
    this.timestamp = timestamp;
  }
}

let newWish = {};

// *************************** Add Gift Idea Section of gift_idea.html ************************

// variables for the storage
let storageRef = storage.ref();
let gsReference;

addGift.addEventListener("click", () => {
  if (giftTitle.value.trim() && giftDescription.value.trim()) {
    newWish = new newWishObject(
      giftTitle.value.trim(),
      giftDescription.value.trim(),
      (storeImage = storeImage),
      new Date()
    );
    // putting the image into firebase storage
    if (newWish.storeImage !== "") {
      let thisRef = storageRef.child(`images/${newWish.storeImage}`);
      thisRef.put(theBlob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
    }

    // end of Storage operation
    console.log(newWish);

    displayTitle.innerHTML = `${giftTitle.value}`;
    displayDescription.innerHTML = `${giftDescription.value}`;
    giftTitle.value = "";
    giftDescription.value = "";

  } else {
    alert("All fields are mandatory!");
  }
});


// ********************* Gift Idea Summary Card section of gift_idea.html *********************
// ************************************** Add location ****************************************


nextToWishlists.addEventListener("click", () => {
  newWish.location = mapLink.href;
  const wishtitle = document.createElement("h3");
  const wishdesc = document.createElement("p");
  const wishloc = document.createElement("p");

  if (newWish.location !== undefined) {
    wishtitle.innerText = `${newWish.wishTitle}`;
    wishdesc.innerText = `${newWish.wishDesc}`;
    wishloc.innerText = `${newWish.location}`;
    windowDescription.appendChild(wishtitle);
    windowDescription.appendChild(wishdesc);
    windowDescription.appendChild(wishloc);
  } else {
    windowDescription.appendChild(wishtitle);
    windowDescription.appendChild(wishdesc);
  }
  console.log(newWish);
});


// ********************* (A) Add to My Wishlist or (B) Friend's List Page *********************


addToWish.addEventListener("click", () => {

  newWish.mine = true;
  addToWishlistSection.classList.remove("show");
  addToWishlistSection.classList.add("hide");
  complete.classList.toggle("hide");
  if (newWish.location !== undefined) {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br><br>
  ${newWish.wishDesc}<br><br>
  ${newWish.location}`;
  } else {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br><br>
  ${newWish.wishDesc}`;
  }
});

const friendEventAdded = document.querySelector("#friendEventAdded");
let createEventInput2;


// **************************** Create (Other) New Event input field **************************


friendEventSelect2.addEventListener("change", () => {
  if (friendEventSelect2.value === "Other") {
    createEvent2.innerHTML = "";
    createEvent2.style.display = "block";
    const inputEl = document.createElement("input");
    inputEl.setAttribute("id", "inputOther");
    inputEl.setAttribute("type", "text");
    const labelEl = document.createElement("label");
    labelEl.innerText = "Create Event";
    labelEl.setAttribute("for", "Other");
    createEvent2.appendChild(labelEl);
    createEvent2.appendChild(inputEl);
    createEventInput2 = document.querySelector("#inputOther");
  } else {
    createEvent2.style.display = "none";
  }
});


// ******************** IF Friends, add Event to newWish Obj and Firestore ********************


addEventBtn.addEventListener("click", () => {
  if (createEventInput2) {
    newWish.eventName = createEventInput2.value;
    newWish.eventDate = friendDate2.value;
    console.log(newWish);
    createEventInput2.value = "";
    friendDate2.value = "";
  } else {
    newWish.eventName = friendEventSelect2.value;
    newWish.eventDate = friendDate2.value;
    console.log(newWish);
    friendEventSelect2.value = "";
    friendDate2.value = "";
  }

  addIdeaToCollection(friendsProfile.value, newWish.wishTitle);
  friendEventAdded.innerHTML = `Successfully added:
    <p> ${newWish.eventName} on ${newWish.eventDate} for ${friendsProfile.value}`;

  setTimeout(() => { location.href = "friendsView.html" }, 1500);

});


// *********************** Add Gift Idea to Firestore and retrieve list ***********************


addToDB.addEventListener("click", async function addToFirestore() {
  logintoadd.innerHTML = "";

  if (firebase.auth().currentUser === null) {
    logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  } else if (newWish.mine) {

    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(newWish.wishTitle)
      .set({
        ...newWish,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

    // complete.classList.toggle("hide");
    // displayGift.classList.toggle("hide");

    // renderWishlist();
    location.href = "mylist.html";
  }
  footerNav.classList.toggle("hide");
});


// ********************** Add Gift Idea to Friend's Collection of ideas ***********************


async function addIdeaToCollection(friendsName, giftTitle) {
  console.log("Event Listener Triggered! ");

  newWish.friendName = friendsName;

  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("Friends")
    .collection("List")
    .doc(friendsName)
    .collection("This Friend's List")
    .doc(giftTitle)
    .set({
      ...newWish,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}


