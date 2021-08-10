// ********************************************************************************************
// ****************** This page is the code for displaying my list gift ideas *****************
// ********************************************************************************************


console.log("Connected to mylist.js");


// *************************** global variables used in the script ****************************

const displayGift = document.querySelector("#giftcard_display");
const editCard = document.querySelector("#editCard");
const wishTitleEdit = document.querySelector("#wishTitleEdit");
const wishDescEdit = document.querySelector("#wishDescEdit");
const saveEditBtn = document.querySelector("#saveEdit");
const deleteWishBtn = document.querySelector("#deleteWish");
const seeFullListLink = document.querySelector("#seeFullList");

// variables for the storage
let storageRef = storage.ref();

// ********************* Outputs the list of gift ideas belonging to User *********************

async function renderWishlist() {
    displayGift.innerHTML = `<h2> My List </h2>`;

    let mainUser = JSON.parse(localStorage.getItem("mainUser"));

    await db
      .collection(mainUser.uid)
      .doc("MyWishlist")
      .collection("List of items")
      .where("mine", "==", true)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("rendering the items");
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
            const theImage = document.createElement("img");
            storageRef
              .child(`images/${doc.data().storeImage}`)
              .getDownloadURL()
              .then((url) => {
                theImage.src = url;
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
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
          const editBtn = document.createElement("button");
          editBtn.type = "button";
          editBtn.classList = "editButton";
          editBtn.innerHTML = `<i class="fas fa-ellipsis-v"></i>`;
          card.appendChild(editBtn);
          editBtn.addEventListener("click", async function () {
            console.log("Edit Button Clicked");
            editWish(doc);
          });
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  
renderWishlist();

  // ******************************* Editing Wishes on user list ********************************
  
  
  function editWish(doc) {
    editCard.style.display = "flex";
    displayGift.style.display = "none";
  
    wishTitleEdit.value = `${doc.data().wishTitle}`;
    wishDescEdit.value = `${doc.data().wishDesc}`;
  
    saveEditBtn.addEventListener("click", async function () {
      console.log("saveEdit Button Clicked");
      let wishEdited = {
        wishTitle: wishTitleEdit.value,
        wishDesc: wishDescEdit.value,
      };
  
      await db
        .collection(firebase.auth().currentUser.uid)
        .doc("MyWishlist")
        .collection("List of items")
        .doc(doc.id)
        .update({ ...wishEdited });
  
    location.reload();
    });
  
    deleteWishBtn.addEventListener("click", async function () {
      console.log("Delete Button Clicked");
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
    location.reload();
    });
  }
    
  seeFullListLink.addEventListener("click", function () {
    location.reload();
  });
  
