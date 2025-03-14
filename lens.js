let lens = document.getElementById('lens');
let output = document.getElementById('output');
let tempbutton = document.querySelector('#tempbutton');
let webcam = document.getElementById('webcam');
let cropSize = 60;
let cropX, cropY;

webcam.addEventListener('play', () => {
    lens.width = webcam.videoWidth;
    lens.height = webcam.videoHeight;
});

tempbutton.addEventListener('click', (event) => { takeshot(event) });

function takeshot(event) {
    let cursorX = event.clientX
    let cursorY = event.clientY
 

    let randomX = Math.random() * (lens.width - cropSize);
    let randomY = Math.random() * (lens.height - cropSize);


    let imgX = (randomX / lens.width) * webcam.videoWidth;
    let imgY = (randomY / lens.height) * webcam.videoHeight;

    cropX = Math.max(0, Math.min(imgX - cropSize / 2, webcam.videoWidth - cropSize));
    cropY = Math.max(0, Math.min(imgY - cropSize / 2, webcam.videoHeight - cropSize));

    let ctx = lens.getContext('2d');
    if (ctx) {

        ctx.drawImage(webcam, cropX, cropY, cropSize, cropSize, randomX, randomY, cropSize, cropSize);

        let data = lens.toDataURL('image/png');
        // output.style.background = `url('${data}') center/cover no-repeat`;
        // output.style.transform = "scale(3)";

        lens.style.background = `url('${data}') center/cover no-repeat`;
    } else {
        console.log('Canvas context not available');
    }

    let ctx2 = lens.getContext('2d');
    if (ctx2) {

        ctx2.drawImage(webcam, cropX, cropY, cropSize, cropSize, cursorX - cropSize / 2, cursorY - cropSize / 2, cropSize, cropSize);

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
