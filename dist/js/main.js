"use strict";console.log("CONNECTED");const usernameInput=document.querySelector("#username"),emailInput=document.querySelector("#email"),passwordInput=document.querySelector("#password"),confirmPassword=document.querySelector("#confirmPassword"),registerBtn=document.querySelector("#registerButton"),registerForm=document.querySelector("#registerForm");class userProfile{constructor(e,s,r,t){this.userName=e,this.email=s,this.password=r,this.confirmPassword=t,this.passwordMatch=function(){this.password===this.confirmPassword?console.log("Your passwords are matching!"):console.log("Your passwords are not matching.")},this.passwordMatch()}get userName(){return this._userName.charAt(0).toUpperCase()+this._userName.slice(1)}set userName(e){(e.length<2||"string"!=typeof e)&&(console.log("USERNAME SHOULD BE AT LEAST 2 CHARACTERS LONG and SHOULD CONTAIN LETTERS ONLY"),this._userName=e)}get password(){return this._password}set password(e){e.match(/[a-z]/g)&&e.match(/[0-9]/g)&&e.match(/[^a-zA-Z\d]/g)&&8<=e.length?this._password=e:console.log("Password should have at least 1 lowercase letter; 1 digit, 1 special character and be minium 8 characters")}}registerForm.addEventListener("submit",e=>{e.preventDefault(),console.log("Form submitted");new userProfile(usernameInput.value,emailInput.value,passwordInput.value,confirmPassword.value)});