// ********************************************************************************************
// *********** This page is the code connecting sections within register+login.html ***********
// ********************************************************************************************


console.log("Connected to PageDisplayIntro.js");

// *************************** global variables used in the script ****************************

const welcomePage = document.querySelector("#welcomePage");
const exploreLink = document.querySelector("#exploreLink");
const seeDemo = document.querySelector("#seeDemo");
const demoPage = document.querySelector("#demo-page");
const signUpBtn = document.querySelector("#sign-up");
const loginBtn = document.querySelector("#log-in");
const loginPage = document.querySelector("#loginPage");
const loginLink = document.querySelector("#loginLink");
const registerLink = document.querySelector("#registerLink");
const skiptologin = document.querySelector("#skiptologin");


seeDemo.addEventListener("click", () => {

    welcomePage.classList.remove('show');
    welcomePage.classList.add('hide');
    demoPage.classList.toggle('hide');

})

signUpBtn.addEventListener("click", () => {

    demoPage.classList.remove('show');
    demoPage.classList.add('hide');
    registerPage.classList.toggle('hide');

})

loginBtn.addEventListener("click", () => {
    demoPage.classList.remove('show');
    demoPage.classList.add('hide');
    loginPage.classList.toggle('hide');
})

skiptologin.addEventListener("click", () => {
    welcomePage.classList.remove('show');
    welcomePage.classList.add('hide');
    loginPage.classList.toggle('hide');
})

loginLink.addEventListener("click", () => {

    registerPage.classList.remove('show');
    registerPage.classList.add('hide');
    loginPage.classList.toggle('hide');
})

registerLink.addEventListener("click", () => {

    loginPage.classList.remove('show');
    loginPage.classList.add('hide');
    registerPage.classList.toggle('hide');
})