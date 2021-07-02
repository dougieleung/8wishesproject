
console.log('pageDisplay.js CONNECTED')



if (loginPage.classList.contains('show')) {
    signUpNow.addEventListener("click", (event) => {
        console.log('Sign Up Now Clicked')
        // document.querySelectorAll("section").forEach((page) => page.classList.remove("show"));
        registerPage.classList.add("show")
        loginPage.classList.remove("show")
    })
}

const p2Btn = document.querySelector("#p2Btn");
if (p2Btn) {
    p2Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page2").classList.add("show");
    })
}

const p3Btn = document.querySelector("#p3Btn");
if (p3Btn) {
    p3Btn.addEventListener("click", (event) => {
        document.querySelectorAll(".page").forEach((page) => page.classList.remove("show"));
        document.querySelector("#page3").classList.add("show")
    })
}

const popBtn = document.querySelector("#popBtn");
if (popBtn) {
    popBtn.addEventListener("click", (event) => {
        document.querySelector("#popup").classList.toggle("show");
    })
}