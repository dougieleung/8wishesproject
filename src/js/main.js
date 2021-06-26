"use strict";
// this will throw errors when any syntax is missed or wrong, has GLOBAL SCOPE



// friends list - need to add and retrieve this from Firestore; for now, we're going to use local static data

    let friendsArray = [];

    // Structure of gift idea object //

    let gift_idea = {
        title: "19th Century Chinese Teaset",
        description: "The accepted history[1] of the tea set begins in China during the Han Dynasty (206–220 BC). At this time, tea ware was made of porcelain and consisted of two styles: a northern white porcelain and a southern light blue porcelain",
        image: null,
        location: null
    }

    // Structure of friend object //

    let friend = {
        name: "Elnaz",
        event: {
            occasion1: "Birthday",
            occasion2: "Wedding Anniversary"
        }
    };

    friendsArray.push(friend);


    // populate idea-window on Gift Idea 3 frame
    
        const div = document.querySelector('.window-description');
        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        p1.innerText = gift_idea.title;
        p2.innerText = gift_idea.description;
        div.append(p1);
        div.append(p2);

      

        