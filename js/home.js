// const userFriendsList = [];
// const events = [];

// window.addEventListener("load", async function upcomingEvents() {
//   console.log("Home page Loaded!");
//   const loggedUser = firebase.auth().currentUser.uid;

//   await db
//     .collection(loggedUser)
//     .doc("Friends")
//     .collection("List")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, " => ", doc.data());
//         userFriendsList.push(doc.id); //returns friends names
//       });
//     })
//     .catch((error) => {
//       console.log("Error getting document:", error);
//     });

//   for (let friendName = 0; friendName < userFriendsList.length; friendName++) {
//     await db
//       .collection(loggedUser)
//       .doc("Friends")
//       .collection("List")
//       .doc(friendName)
//       .collection()
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           console.log(doc);
//           events.push(doc);
//         });
//       })
//       .catch((error) => {
//         console.log("Error getting document:", error);
//       });
//   }
// });
