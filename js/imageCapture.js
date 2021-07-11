const cameraBtn = document.querySelector("#camera_btn");
const video = document.querySelector("#video");
const snap = document.querySelector("#snap");
const canvas = document.querySelector("#canvas");
const canvas2 = document.querySelector("#canvas2");
const context = canvas.getContext("2d");
context.scale(0.5, 0.5);

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

function handleBlob(blob) {

    const objectURL = window.URL.createObjectURL(blob);
    const copyImg = document.createElement("img");
    copyImg.style.height = "100px";
    copyImg.src = objectURL;
    canvas.appendChild(copyImg);
    console.log(objectURL);
}