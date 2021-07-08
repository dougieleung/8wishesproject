
console.log('pageDisplay.js CONNECTED')

// ================== Fetching from DOM ===================

const startIdeaBtn = document.querySelector('#startIdeaBtn');
const giftIdeaHomePage = document.querySelector('#giftIdeaHomePage');
const giftIdeaAdd = document.querySelector('#giftIdeaAdd');
const summaryCard = document.querySelector('#summaryCard');
const addToWishlistSection = document.querySelector('#addToWishlistSection');
const nextToEvents = document.querySelector('#nextToEvents');
const chooseEvent = document.querySelector('#chooseEvent');
const complete = document.querySelector('#complete');


// ==================== Gift Ideas pages Display ========================

startIdeaBtn.addEventListener('click', () => {
    console.log('Starting New Idea - clicked button');
    giftIdeaHomePage.classList.remove('show');
    giftIdeaHomePage.classList.add('hide');
    giftIdeaAdd.classList.toggle('hide');
})

addGift.addEventListener('click', () => {
    giftIdeaAdd.classList.remove('show');
    giftIdeaAdd.classList.add('hide');
    summaryCard.classList.toggle('hide');
})


nextToWishlists.addEventListener('click', () => {
    console.log('nextToWishlists Button Clicked')
    summaryCard.classList.remove('show');
    summaryCard.classList.add('hide');
    addToWishlistSection.classList.toggle('hide');
})

nextToEvents.addEventListener('click', () => {
    addToWishlistSection.classList.add('hide');
    addToWishlistSection.classList.remove('show');
    chooseEvent.classList.toggle('hide');
})

addEventBtn.addEventListener('click', () => {
    chooseEvent.classList.add('hide');
    chooseEvent.classList.remove('show');
    complete.classList.toggle('hide');
})

// =============== Register Login Attempt to hide/show pages ============== 

// if (loginPage.classList.contains('show')) {
//     signUpNow.addEventListener("click", (event) => {
//         console.log('Sign Up Now Clicked')
//         // document.querySelectorAll("section").forEach((page) => page.classList.remove("show"));
//         registerPage.classList.add("show")
//         loginPage.classList.remove("show")
//     })
// }

// const p2Btn = document.querySelector("#p2Btn");
// if (p2Btn) {
//     p2Btn.addEventListener("click", (event) => {
//         document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
//         document.querySelector("#page2").classList.add("show");
//     })
// }

// const p3Btn = document.querySelector("#p3Btn");
// if (p3Btn) {
//     p3Btn.addEventListener("click", (event) => {
//         document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
//         document.querySelector("#page3").classList.add("show")
//     })
// }

// const popBtn = document.querySelector("#popBtn");
// if (popBtn) {
//     popBtn.addEventListener("click", (event) => {
//         document.querySelector("#popup").classList.toggle("show");
//     })
// }