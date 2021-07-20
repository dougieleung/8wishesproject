// ********************************************************************************************
// ********** This page is the code for adding gift idea to user or to friend's list **********
// ********************************************************************************************

// ************* global variables used in the script *************

const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDesc");
const displayGift = document.querySelector("#giftcard_display");
const windowDescription = document.querySelector("#windowDescription");
const editCard = document.querySelector("#editCard");
const wishTitleEdit = document.querySelector("#wishTitleEdit");
const wishDescEdit = document.querySelector("#wishDescEdit");
const saveEditBtn = document.querySelector("#saveEdit");
const deleteWishBtn = document.querySelector("#deleteWish");
const seeFullListLink = document.querySelector("#seeFullList");

// ************ create wish idea object through class ************


class newWishObject {
  constructor(title, description, image, timestamp) {
    this.wishTitle = title;
    this.wishDesc = description;
    this.storeImage = image;
    this.timestamp = timestamp;
  }
}

let newWish = {};

// ********** #2 Add Gift Idea Section of gift_idea.html **********

// variables for the storage
let storageRef;
let gsReference;
addGift.addEventListener("click", () => {

  if (giftTitle.value.trim() && giftDescription.value.trim()) {
    newWish = new newWishObject(
      giftTitle.value.trim(),
      giftDescription.value.trim(),
      storeimage = storeImage,
      new Date()
    );
    // putting the image into firebase storage
    storageRef = storage.ref();
    let thisRef = storageRef.child(`images/${newWish.wishTitle}`);
    thisRef.put(theBlob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

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

// ****** #4 Gift Idea Summary Card section of gift_idea.html ******
// ************************ Add location ***************************

nextToWishlists.addEventListener("click", () => {

  newWish.location = mapLink.href;

  if (newWish.location !== undefined) {
    windowDescription.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  } else {
    windowDescription.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}`;
  }
  console.log(newWish);
});

// ****** #5 (A) Add to My Wishlist or (B) Friend's List Page ******

addToWish.addEventListener("click", () => {

  addWishMsg.innerHTML = "";
  newWish.mine = true;
  addToWishlistSection.classList.remove('show');
  addToWishlistSection.classList.add('hide');
  complete.classList.toggle('hide');
  if (newWish.location !== undefined) {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}<br>
  ${newWish.location}`;
  } else {
    ideaSummary.innerHTML = `${newWish.wishTitle}<br>
  ${newWish.wishDesc}`;
  }

});

const friendEventAdded = document.querySelector("#friendEventAdded");

// **** #7 (B) IF Friends, add Event to newWish Obj and Firestore ****

addEventBtn.addEventListener("click", () => {

  newWish.eventName = friendEventSelect2.value;
  newWish.eventDate = friendDate2.value;
  console.log(newWish);
  friendEventSelect2.value = "";
  friendDate2.value = "";

  addIdeaToCollection(friendsProfile.value, newWish.wishTitle);
  friendEventAdded.innerHTML = `Successfully added:
    <p> ${newWish.eventName} on ${newWish.eventDate} for ${friendsProfile.value}`;



});

// ********** Add Gift Idea to Firestore and retrieve list ************

addToDB.addEventListener("click", async function addToFirestore() {
  logintoadd.innerHTML = "";
  // ideaAddedMsg.innerHTML = "";

  if (firebase.auth().currentUser === null) {
    logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  } else if (newWish.mine) {
    // ideaAddedMsg.innerHTML = "Your idea is added!";

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

    complete.classList.toggle('hide');
    displayGift.classList.toggle('hide')

    displayGift.innerHTML = `<h2> My List </h2>`;

    // See L216 Function
    renderWishlist();
  }
});

// ********** Lists out the friend's names from Firestore ************

async function friendsListfromDB() {
  console.log("friends list summary!");
  friendsList.innerHTML = "";
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
        buttonItem.addEventListener("click", () => {

          // See L185 Function
          addIdeaToCollection(doc.id);
        });

        const friendsNames = document.createTextNode(`${doc.id}`);
        buttonItem.appendChild(friendsNames);
        listItem.appendChild(buttonItem);
        list.appendChild(listItem);

      });

      friendsList.appendChild(list);
    })

    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// ********** Add Gift Idea to Friend's Collection of ideas ************

async function addIdeaToCollection(friendsName, giftTitle) {
  console.log("Event Listener Triggered! ");

  // if (firebase.auth().currentUser === null) {
  //   logintoadd.innerHTML = "Sorry.  Please sign in before adding wishes.";
  // } else {
  //   ideaAddedMsg.innerHTML = "Your idea is added!";

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

// ********** Outputs the list of gift ideas belonging to User ************

async function renderWishlist() {
  displayGift.innerHTML = `<h2> My List </h2>`;
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("MyWishlist")
    .collection("List of items")
    .where("mine", "==", true)
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());        
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
          const theImage = document.createElement('img');
          storageRef.child(`images/${doc.data().wishTitle}`).getDownloadURL()
            .then((url) => {
              theImage.src = url;
            })
            .catch((error) => {
              // Handle any errors
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

        displayGift.appendChild(card);

        // Editing an item
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.classList = 'editButton'
        editBtn.innerText = "Edit/Delete";
        card.appendChild(editBtn);
        editBtn.addEventListener('click', async function () {
          console.log('Edit Button Clicked');
          editWish(doc);
        })
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

// ***************** Editing Wishes on user list *******************

function editWish(doc) {
  editCard.classList.remove('hide');
  displayGift.classList.add('hide');

  wishTitleEdit.value = `${doc.data().wishTitle}`;
  wishDescEdit.value = `${doc.data().wishDesc}`

  saveEditBtn.addEventListener('click', async function () {
    console.log('saveEdit Button Clicked');
    let wishEdited = {
      wishTitle: wishTitleEdit.value,
      wishDesc: wishDescEdit.value,
    };
    // editCard.classList.add('hide');
    // renderWishlist();
    // displayGift.classList.remove('hide');
    await db.collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .update({ ...wishEdited });


    editCard.classList.add('hide');
    displayGift.innerHTML = "";
    renderWishlist();
    displayGift.classList.remove('hide');

  })


  deleteWishBtn.addEventListener('click', async function () {
    console.log('Delete Button Clicked');
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc(doc.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    editCard.classList.add('hide');
    displayGift.innerHTML = "";
    renderWishlist();
    displayGift.classList.remove('hide');
  });
}
