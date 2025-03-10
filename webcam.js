var video = document.querySelector("#webcam");

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (err) {
            console.log("Sorry, video not working: " + err);
        });
} else {
    console.log("Webcam not supported in this browser :(");
}