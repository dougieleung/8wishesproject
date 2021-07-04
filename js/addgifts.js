// START CREATING AN OBJECT FOR THE WISH
class newWishObject {
  constructor(title, desc) {
    (this.wishTitle = title), (this.wishDesc = desc);
  }
}

const displayTitle = document.querySelector("#displayTitle");
const displayDescription = document.querySelector("#displayDesc");

let newWish;
addGift.addEventListener("click", () => {
  if (giftTitle.value.trim() && giftDescription.value.trim()) {
    newWish = new newWishObject(
      giftTitle.value.trim(),
      giftDescription.value.trim()
    );
    displayTitle.innerHTML = `${giftTitle.value}`;
    displayDescription.innerHTML = `${giftDescription.value}`;
    giftTitle.value = "";
    giftDescription.value = "";
  } else {
    alert("All fields are mandatory!");
  }
});

addToWish.addEventListener("click", () => {
  newWish.mine = true;
});

addToFriend.addEventListener("click", () => {
  newWish.mine = false;
});

addEventBtn.addEventListener("click", () => {
  if (eventName.value.trim() && dateOfEvent.value) {
    newWish.eventName = eventName.value;
    newWish.eventDate = dateOfEvent.value;
    console.log(newWish);
    eventName.value = "";
    dateOfEvent.value = "";
  } else {
    alert("All fields are mandatory!");
  }
});

//  ADD GIFT ITEM TO DB
addToDB.addEventListener("click", async function addToFirestore() {
  console.log("KEEP CALM AAAAANDDDD ..... Adding to FIRESTORE");
  if (newWish.mine) {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .doc()
      .set({
        ...newWish,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  } else {
    await db
      .collection(firebase.auth().currentUser.uid)
      .doc("Friends")
      .collection("List")
      .doc()
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
});

// // ADD TO WISHLIST FOR THE LOGGED IN USER
// addToDB.addEventListener("click", async function addToWishlist() {

//   const snapshot = await firebase
//     .firestore()
//     .collection(firebase.auth().currentUser.uid)
//     .get();
//   return snapshot.docs.map((doc) => doc.data());
//   //   console.log(snapshot.docs.map((doc) => doc.data().giftTitle));
//   //   console.log(snapshot.docs.map((doc) => doc.data().giftDescription));
// });
