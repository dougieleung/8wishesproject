// ********************************************************************************************
// ************************ This page is the code related to home page ************************
// ********************************************************************************************

'use strict';

console.log("Connected to home.js");

// *************************** global variables used in the script ****************************

const userFriendsList = [];
const sortedEventsArray = [];
const eventsWrapper = document.querySelector("#events-wrapper");
const loadingPage = document.querySelector(".loading-page");
const loginFirst = document.querySelector(".login-first");

// **************************************** functions *****************************************

async function upcomingEvents() {

  let mainUser = JSON.parse(localStorage.getItem("mainUser"));

  if (mainUser === null) {
    loginFirst.style.display = "flex";
    loadingPage.style.display = "none";
  } else {
    loginFirst.style.display = "none";
  }

  await db
    .collection(mainUser.uid)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userFriendsList.push(doc.id); //returns friends names
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  for (let friend = 0; friend < userFriendsList.length; friend++) {
    await db
      .collection(mainUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(userFriendsList[friend])
      .get()
      .then((doc) => {
        if (
          doc.data().eventDate !== undefined &&
          doc.data().eventName !== undefined
        ) {
          sortedEventsArray.push(doc.data());
        }
      });
  }

  for (let friend = 0; friend < userFriendsList.length; friend++) {
    await db
      .collection(mainUser.uid)
      .doc("Friends")
      .collection("List")
      .doc(userFriendsList[friend])
      .collection("This Friend's List")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          sortedEventsArray.push(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  //  Sorting by event dates
  sortedEventsArray.sort(function (a, b) {
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  // hide loading page
  loadingPage.style.display = "none";

  //create home title
  const homeTitle = document.createElement("h1");
  homeTitle.className = "home-title";
  homeTitle.innerText = "All Events";
  eventsWrapper.appendChild(homeTitle);


  for (let j = 0; j < sortedEventsArray.length; j++) {
    let options = { month: 'short', day: 'numeric' };
    let formattedDate = new Date(sortedEventsArray[j].eventDate).toLocaleDateString("en-US", options);
    const eventCards = document.createElement("div");
    eventCards.setAttribute("class", "events-cards");
    eventCards.style.border = "1px solid black";
    // create a class in scss, for this
    console.log(sortedEventsArray);
    const friendNames = document.createElement("h4");
    friendNames.innerText = `${sortedEventsArray[j].friendName}`;
    eventCards.appendChild(friendNames);

    const friendEvents = document.createElement("p");
    friendEvents.innerText = `${sortedEventsArray[j].eventName}`;
    eventCards.appendChild(friendEvents);

    const friendDates = document.createElement("p");
    friendDates.innerText = `${formattedDate}`;
    eventCards.appendChild(friendDates);

    eventsWrapper.appendChild(eventCards);
  }
}

upcomingEvents();