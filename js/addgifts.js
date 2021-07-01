//  ADD GIFT ITEM TO DB
addGift.addEventListener("click", async function addToFirestore() {
  await db
    .collection(firebase.auth().currentUser.uid)
    .doc("addGifts")
    .set({
      // username: this.username,
      //   userID: firebase.auth().currentUser.uid,
      giftTitle: giftTitle.value,
      giftDescription: giftDescription.value,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});

// ADD TO WISHLIST FOR THE LOGGED IN USER
addWishlist.addEventListener("click", async function addToWishlist() {
  console.log("Button clicked");
  const snapshot = await firebase
    .firestore()
    .collection(firebase.auth().currentUser.uid)
    .get();
  return snapshot.docs.map((doc) => doc.data());
  //   console.log(snapshot.docs.map((doc) => doc.data().giftTitle));
  //   console.log(snapshot.docs.map((doc) => doc.data().giftDescription));
});
