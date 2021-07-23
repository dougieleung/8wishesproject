const friendObjects = [];
const eventsWrapper = document.querySelector("#events-wrapper");

upcomingEvents();

async function upcomingEvents() {
  const loggedUser = JSON.parse(this.localStorage.getItem("mainUser")).uid;

  await db
    .collection(loggedUser)
    .doc("Friends")
    .collection("List")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        friendObjects.push(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  // for (let j = 0; j < friendObjects.length; j++) {
  //   await db
  //     .collection(loggedUser)
  //     .doc("Friends")
  //     .collection("List")
  //     .doc(friendObjects[j].friendName)
  //     .collection("This Friend's List")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         friendObjects.push(doc.data());
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }

  //Sorting by event dates
  friendObjects.sort(function (a, b) {
    return new Date(a.eventDate) - new Date(b.eventDate);
  });

  for (let i = 0; i < friendObjects.length; i++) {
    if (
      friendObjects[i].eventDate !== undefined &&
      friendObjects[i].eventName !== undefined
    ) {
      // console.log(doc.data());
      const eventCards = document.createElement("div");
      eventCards.setAttribute("class", "events-cards");
      eventCards.style.border = "1px solid black";
      // create a class in scss, for this

      const friendNames = document.createElement("h4");
      friendNames.innerText = `${friendObjects[i].friendName}`;
      eventCards.appendChild(friendNames);

      const eventNames = document.createElement("p");
      eventNames.innerText = `${friendObjects[i].eventName}`;
      eventCards.appendChild(eventNames);

      const eventDates = document.createElement("p");
      eventDates.innerText = `${friendObjects[i].eventDate}`;
      eventCards.appendChild(eventDates);

      eventsWrapper.appendChild(eventCards);
    }
  }
}
