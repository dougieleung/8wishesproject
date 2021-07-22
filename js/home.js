const userFriendsList = [];
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
        console.log(doc.id, " => ", doc.data());
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

        if (doc.data().friendDate !== undefined && doc.data().friendEvent !== undefined) {
        // console.log(doc.data());
        const eventCards = document.createElement("div");
        eventCards.setAttribute("class", "events-cards");
        eventCards.style.border = "1px solid black";
        // create a class in scss, for this

        const friendNames = document.createElement("h4");
        friendNames.innerText = `${doc.data().friendName}`;
        eventCards.appendChild(friendNames);

        const friendEvents = document.createElement("p");
        friendEvents.innerText = `${doc.data().friendEvent}`;
        eventCards.appendChild(friendEvents);

        const friendDates = document.createElement("p");
        friendDates.innerText = `${doc.data().friendDate}`;
        eventCards.appendChild(friendDates);

        eventsWrapper.appendChild(eventCards);
        }
      })
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
           
          console.log(userFriendsList);  
          // console.log(doc.data());
          const eventCards = document.createElement("div");
          eventCards.setAttribute("class", "events-cards");
          eventCards.style.border = "1px solid black";
          // create a class in scss, for this
      
          const friendNames = document.createElement("h4");
          friendNames.innerText = `${userFriendsList[friend]}`;
          eventCards.appendChild(friendNames);
      
          const friendEvents = document.createElement("p");
          friendEvents.innerText = `${doc.data().eventName}`;
          eventCards.appendChild(friendEvents);
      
          const friendDates = document.createElement("p");
          friendDates.innerText = `${doc.data().eventDate}`;
          eventCards.appendChild(friendDates);
      
          eventsWrapper.appendChild(eventCards);
          
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
}
