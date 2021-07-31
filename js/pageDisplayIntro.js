// ********************************************************************************************
// *********** This page is the code connecting sections within register+login.html ***********
// ********************************************************************************************


console.log("Connected to PageDisplayIntro.js");


// *************************** global variables used in the script ****************************

const welcomePage = document.querySelector("#welcomePage");
const exploreLink = document.querySelector("#exploreLink");
const seeDemo = document.querySelector("#seeDemo");
const demoPage = document.querySelector("#demo-page");
const demopage1 = document.querySelector("#demopage1");
const demopage2 = document.querySelector("#demopage2");
const demopage3 = document.querySelector("#demopage3");
const ellipsis1 = document.querySelector("#ellipsis1");
const ellipsis2 = document.querySelector("#ellipsis2");
const ellipsis3 = document.querySelector("#ellipsis3");
const signUpBtn = document.querySelector("#sign-up");
const loginBtn = document.querySelector("#log-in");
const loginPage = document.querySelector("#loginPage");
const loginLink = document.querySelector("#loginLink");
const registerLink = document.querySelector("#registerLink");
const skiptologin = document.querySelector("#skiptologin");




seeDemo.addEventListener("click", () => {
    welcomePage.classList.remove("show");
    welcomePage.classList.add("hide");
    demoPage.classList.toggle("hide");
})

ellipsis1.addEventListener("click", () => {
    demopage1.classList.remove("show");
    demopage1.classList.add("hide");
    demopage2.classList.toggle("hide");
})

ellipsis2.addEventListener("click", () => {
    demopage2.classList.remove("show");
    demopage2.classList.add("hide");
    demopage3.classList.toggle("hide");
})

ellipsis3.addEventListener("click", () => {
    demopage3.classList.remove("show");
    demopage3.classList.add("hide");
    demopage1.classList.toggle("hide");
})

signUpBtn.addEventListener("click", () => {
    demoPage.classList.remove("show");
    demoPage.classList.add("hide");
    registerPage.classList.toggle("hide");
})

loginBtn.addEventListener("click", () => {
    demoPage.classList.remove("show");
    demoPage.classList.add("hide");
    loginPage.classList.toggle("hide");
})

skiptologin.addEventListener("click", () => {
    welcomePage.classList.remove("show");
    welcomePage.classList.add("hide");
    loginPage.classList.toggle("hide");
})

loginLink.addEventListener("click", () => {
    registerPage.classList.remove("show");
    registerPage.classList.add("hide");
    loginPage.classList.toggle("hide");
})

registerLink.addEventListener("click", () => {
    loginPage.classList.remove("show");
    loginPage.classList.add("hide");
    registerPage.classList.toggle("hide");
})