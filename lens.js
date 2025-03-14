let lens = document.getElementById('lens');
let output = document.getElementById('output');
let tempbutton = document.querySelector('#tempbutton');
let webcam = document.getElementById('webcam');
let cropSize = 100;  // Size of the cropped area (in pixels)
let cropX, cropY;

webcam.addEventListener('play', () => {
    lens.width = webcam.videoWidth;
    lens.height = webcam.videoHeight;
});


tempbutton.addEventListener('click', (event) => { takeshot(event) });

function takeshot(event) {

    let rect = lens.getBoundingClientRect();
    

    let cursorX = event.clientX - rect.left;
    let cursorY = event.clientY - rect.top;

    if (cursorX >= 0 && cursorX <= lens.width && cursorY >= 0 && cursorY <= lens.height) {
        
        
        let imgX = (cursorX / lens.width) * webcam.videoWidth;
        let imgY = (cursorY / lens.height) * webcam.videoHeight;

        cropX = Math.max(0, Math.min(imgX - cropSize / 2, webcam.videoWidth - cropSize));
        cropY = Math.max(0, Math.min(imgY - cropSize / 2, webcam.videoHeight - cropSize));

        let ctx = lens.getContext('2d');
        // ctx.clearRect(0, 0, lens.width, lens.height); // Clear the canvas before drawing
    
        ctx.drawImage(webcam, cropX, cropY, cropSize, cropSize, cursorX - cropSize / 2, cursorY - cropSize / 2, cropSize, cropSize);

        
        let data = lens.toDataURL('image/png');
        output.style.background = `url('${data}') center/cover no-repeat`;
        output.style.transform = "scale(3)";
    }
}

// // Additional debug - check mouse position
// document.addEventListener('mousemove', (event) => {
//     let rect = lens.getBoundingClientRect();
//     let cursorX = event.clientX - rect.left;
//     let cursorY = event.clientY - rect.top;

//     console.log("Cursor X:", cursorX, "Cursor Y:", cursorY);
// });
