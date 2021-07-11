
console.log('pageDisplay.js CONNECTED')

// ================== Fetching from DOM for Gift Idea Page ===================

const startIdeaBtn = document.querySelector('#startIdeaBtn');
const backToStart = document.querySelector('#backToStart');
const giftIdeaHomePage = document.querySelector('#giftIdeaHomePage');
const giftIdeaAdd = document.querySelector('#giftIdeaAdd');
const takePhoto = document.querySelector("#takePhoto");
const backToIdeaAdd = document.querySelector("#backToIdeaAdd");
const backToIdeaAdd2 = document.querySelector("#backToIdeaAdd2");
const addGift = document.querySelector("#addGift");
const nextToWishlists = document.querySelector("#nextToWishlists");
const summaryCard = document.querySelector('#summaryCard');
const backToSummaryCard = document.querySelector("#backToSummaryCard");
const addToWishlistSection = document.querySelector('#addToWishlistSection');
const nextToEvents = document.querySelector('#nextToEvents');
const backToWishlistSection = document.querySelector('#backToWishlistSection');
const chooseEvent = document.querySelector('#chooseEvent');
const backToChooseEvent = document.querySelector('#backToChooseEvent');
const complete = document.querySelector('#complete');

// ==================== Gift Ideas pages Display ========================

startIdeaBtn.addEventListener('click', () => {
    console.log('Starting New Idea - clicked button');
    giftIdeaHomePage.classList.remove('show');
    giftIdeaHomePage.classList.add('hide');
    giftIdeaAdd.classList.toggle('hide');
})

backToStart.addEventListener('click', () => {
    console.log('going back');
    giftIdeaAdd.classList.remove('show');
    giftIdeaAdd.classList.add('hide');
    giftIdeaHomePage.classList.toggle('hide');
})

addGift.addEventListener('click', () => {
    giftIdeaAdd.classList.remove('show');
    giftIdeaAdd.classList.add('hide');
    summaryCard.classList.toggle('hide');
})

backToIdeaAdd.addEventListener('click', () => {
    summaryCard.classList.remove('show');
    summaryCard.classList.add('hide');
    giftIdeaAdd.classList.toggle('hide');
})

cameraBtn.addEventListener('click', () => {
    giftIdeaAdd.classList.remove('show');
    giftIdeaAdd.classList.add('hide');
    takePhoto.classList.toggle('hide');
})

backToIdeaAdd2.addEventListener('click', () => {
    takePhoto.classList.remove('show');
    takePhoto.classList.add('hide');
    giftIdeaAdd.classList.toggle('hide');
})

nextToWishlists.addEventListener('click', () => {
    console.log('nextToWishlists Button Clicked')
    summaryCard.classList.remove('show');
    summaryCard.classList.add('hide');
    addToWishlistSection.classList.toggle('hide');
})

backToSummaryCard.addEventListener('click', () => {
    addToWishlistSection.classList.remove('show');
    addToWishlistSection.classList.add('hide');
    summaryCard.classList.toggle('hide');
})

nextToEvents.addEventListener('click', () => {
    addToWishlistSection.classList.add('hide');
    addToWishlistSection.classList.remove('show');
    complete.classList.toggle('hide');
})

backToChooseEvent.addEventListener('click', () => {
    complete.classList.remove('show');
    complete.classList.add('hide');
    addToWishlistSection.classList.toggle('hide');
})

// addEventBtn.addEventListener('click', () => {
//     chooseEvent.classList.add('hide');
//     chooseEvent.classList.remove('show');
//     complete.classList.toggle('hide');
// })

// backToChooseEvent.addEventListener('click', () => {
//     complete.classList.remove('show');
//     complete.classList.add('hide');
//     chooseEvent.classList.toggle('hide');
// })