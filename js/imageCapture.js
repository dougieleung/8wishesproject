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
  
  navigator.mediaDevices.getUserMedia({video: true})
  .then(stream => {
    video.srcObject = stream;
    const track = stream.getVideoTracks()[0];
    imageCapture = new ImageCapture(track);
  })
  .catch(error => console.log(error));
  
});

snap.addEventListener("click", function () {

    context.drawImage(video,0,0);
    const imageBlob = canvas.toBlob(handleBlob, "image/jpeg");

});

backToIdeaAdd2.addEventListener("click", function () {

    const tracks = video.srcObject.getTracks();
    tracks.forEach(track => track.stop());

});

function handleBlob(blob) {

    const objectURL = window.URL.createObjectURL(blob);
    
    const copyImg = document.createElement("img");
    copyImg.style.height = "200px";
    copyImg.src = objectURL;
    summaryCardimage.innerHTML = "";
    summaryCardimage.appendChild(copyImg);
 
    const copyImg2 = document.createElement("img");
    copyImg2.style.height = "100px";
    copyImg2.src = objectURL;
    windowImage.innerHTML = "";
    windowImage.appendChild(copyImg2);
    storeImage = objectURL;
}
