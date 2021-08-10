// ********************************************************************************************
// ************************ This page is the code related to camera API ***********************
// ********************************************************************************************

'use strict';

console.log("Connected to imageCapture.js");

// *************************** global variables used in the script ****************************


const cameraBtn = document.querySelector("#camera_btn");
const video = document.querySelector("#video");
const snap = document.querySelector("#snap");
const canvas = document.querySelector("#canvas");
const summaryCardimage = document.querySelector("#summaryCardimage");
const windowImage = document.querySelector("#windowImage");
const context = canvas.getContext("2d");
let storeImage = "";

context.scale(0.4, 0.4);

cameraBtn.addEventListener("click", function () {

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      const track = stream.getVideoTracks()[0];
      track.enabled = true;
      imageCapture = new ImageCapture(track);
    })
    .catch(error => console.log(error));

});

snap.addEventListener("click", function () {

  context.drawImage(video, 0, 0);
  const imageBlob = canvas.toBlob(handleBlob, "image/jpeg");

  function playAudio() {
    const cameraAudio = document.querySelector("#cameraAudio");

    cameraAudio.play();
  }

  playAudio();

});

addPhoto.addEventListener("click", function () {

  const tracks = video.srcObject.getTracks();
  tracks.forEach(track => track.stop());

});

let theBlob;
function handleBlob(blob) {
  theBlob = blob;
  const objectURL = window.URL.createObjectURL(blob);

  const copyImg = document.createElement("img");
  copyImg.src = objectURL;
  summaryCardimage.innerHTML = "";
  summaryCardimage.appendChild(copyImg);
  const copyImg2 = document.createElement("img");
  copyImg2.src = objectURL;
  windowImage.innerHTML = "";
  windowImage.appendChild(copyImg2);
  storeImage = objectURL;
}




