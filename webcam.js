var video = document.querySelector("#webcam");

if (navigator.mediaDevices.getUserMedia) {
    // Request access to video
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            console.log("Webcam stream is active");
            video.srcObject = stream;
        })
        .catch(function (err) {
            console.log("sorry, webcam not working :( " + err);
        });
} else {
    console.log("webcam not supported :(");
}

