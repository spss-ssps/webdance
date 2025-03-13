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

        // Create a video element and set its source to the webcam stream
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        // Once the video is playing, start drawing it to the canvas
        video.addEventListener('play', () => {
            console.log('Video is playing');
            drawWebcamFeed(video);
        });
    })
    .catch(function (err) {
        // If there is an error accessing the webcam, log it
        console.error("Error accessing webcam: ", err);
        alert("Could not access webcam. Please check permissions.");
    });

// Function to draw webcam feed on the canvas
function drawWebcamFeed(video) {
    function draw() {
        // Check if the video has dimensions and is playing
        if (video.videoWidth && video.videoHeight) {
            webcamCtx.drawImage(video, 0, 0, webcamCanvas.width, webcamCanvas.height);
        }
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
        mouseX - lensSize / 2 * zoom, mouseY - lensSize / 2 * zoom, lensSize * zoom, lensSize * zoom
    );

    webcamCtx.restore();

    // Save the trace for mouse movement (red circle)
    traces.push({ x: mouseX, y: mouseY, time: Date.now() });

    // Remove traces older than 2 seconds
    traces = traces.filter(trace => Date.now() - trace.time < 2000);
});

// Function to draw traces (red circles) on the canvas
function drawTraces() {
    traces.forEach(trace => {
        webcamCtx.beginPath();
        webcamCtx.arc(trace.x, trace.y, 25, 0, Math.PI * 2, false);
        webcamCtx.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Semi-transparent red
        webcamCtx.fill();
    });
}

// Resize the canvas when the window is resized
window.addEventListener('resize', () => {
    webcamCanvas.width = window.innerWidth;
    webcamCanvas.height = window.innerHeight;
});
