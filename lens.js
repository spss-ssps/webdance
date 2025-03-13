// Grab the canvas element and its context for drawing
const webcamCanvas = document.getElementById('webcamCanvas');
const webcamCtx = webcamCanvas.getContext('2d');
const snapshotCanvas = document.getElementById('snapshotCanvas');
const snapshotCtx = snapshotCanvas.getContext('2d');

let webcamStream;
let traces = [];
const zoom = 5;  // Magnifying effect zoom level

// Set the canvas size to the full screen
webcamCanvas.width = window.innerWidth;
webcamCanvas.height = window.innerHeight;

// Access webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        webcamStream = stream;
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // Once the video is playing, start drawing it to the canvas
        video.addEventListener('play', () => {
            drawWebcamFeed(video);
        });
    })
    .catch(function (err) {
        console.error("Error accessing webcam: ", err);
    });

// Function to draw webcam feed on the canvas
function drawWebcamFeed(video) {
    function draw() {
        webcamCtx.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);
        drawTraces();  // Draw traces on top of the webcam feed
        requestAnimationFrame(draw);  // Keep drawing at 60 frames per second
    }
    draw();
}

// Function to handle mouse movement and magnifying effect
webcamCanvas.addEventListener('mousemove', function (event) {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    // Draw magnifying effect by scaling the area under the cursor
    const lensSize = 100;
    webcamCtx.save();
    webcamCtx.beginPath();
    webcamCtx.arc(mouseX, mouseY, lensSize, 0, Math.PI * 2);
    webcamCtx.clip();

    webcamCtx.drawImage(
        webcamCanvas,
        mouseX - lensSize / 2, mouseY - lensSize / 2, lensSize, lensSize,
        mouseX - lensSize / 2
