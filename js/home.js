const userFriendsList = [];
const sortedEventsArray = [];
const eventsWrapper = document.querySelector("#events-wrapper");

upcomingEvents();

async function upcomingEvents() {
  console.log("Home page Loaded!");
  const loggedUser = JSON.parse(this.localStorage.getItem("mainUser")).uid;
  console.log(loggedUser);

  await db
    .collection(loggedUser)
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
      .collection(loggedUser)
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
      .collection(loggedUser)
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

  for (let j = 0; j < sortedEventsArray.length; j++) {
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
    friendDates.innerText = `${sortedEventsArray[j].eventDate}`;
    eventCards.appendChild(friendDates);

    eventsWrapper.appendChild(eventCards);
  }
}
