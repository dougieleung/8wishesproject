// ********************************************************************************************
// *********************** This page is the code related to geolocation ***********************
// ********************************************************************************************

'use strict';

console.log("Connected to geolocation.js");

// Retrieve longitude and latitude coordinates and use openStreetMap to locate
// source code inspired by MDN Mozilla Tutorial https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API

// *************************** global variables used in the script ****************************

const locate = document.querySelector("#locate");
const status = document.querySelector("#status");
const mapLink = document.querySelector("#map-link");

// **************************************** functions *****************************************

function geoLocation () {

    mapLink.href = "";
    mapLink.textContent = "";
  
    function located(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Click to see the map!`;
    }
  
    function error() {
      status.textContent = "Unable to retrieve your location";
    }
  
    if(!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(located, error);
    }
  
  }
  
  locate.addEventListener("click", geoLocation);