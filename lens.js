let lens = document.getElementById('lens');
let output = document.getElementById('output');
let tempbutton = document.querySelector('#tempbutton');
let webcam = document.getElementById('webcam');
let cropSize = 70;
let cropX, cropY;

webcam.addEventListener('play', () => {
    lens.width = webcam.videoWidth;
    lens.height = webcam.videoHeight;
});

tempbutton.addEventListener('click', (event) => { takeshot(event) });

function takeshot(event) {
    let cursorX = event.clientX;
    let cursorY = event.clientY;

    let randomX = Math.random() * (lens.width - cropSize);
    let randomY = Math.random() * (lens.height - cropSize);

    // let imgX = (randomX / lens.width) * webcam.videoWidth;
    // let imgY = (randomY/ lens.height) * webcam.videoHeight;
    let imgX = (cursorX / lens.width) * webcam.videoWidth;
    let imgY = (cursorY / lens.height) * webcam.videoHeight;
    
    let randomImgX = (randomX / lens.width) * webcam.videoWidth;
    let randomImgY = (randomY / lens.height) * webcam.videoHeight;

    cropX = Math.max(0, Math.min(randomImgX - cropSize / 2, webcam.videoWidth - cropSize));
    cropY = Math.max(0, Math.min(randomImgY - cropSize / 2, webcam.videoHeight - cropSize));

    let ctx = lens.getContext('2d');
    if (ctx) {

        ctx.drawImage(webcam, cropX, cropY, cropSize, cropSize, randomX, randomY, cropSize, cropSize);

        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        let distanceX = Math.abs(cursorX - centerX);
        let distanceY = Math.abs(cursorY - centerY);
        let maxDistanceX = centerX;
        let maxDistanceY = centerY;

        let opacity = (distanceX / maxDistanceX);
        let grayscale = 50 + (1 - (distanceY / maxDistanceY)) * 50;

        lens.style.opacity = opacity;
        lens.style.filter = `grayscale(${grayscale}%)`;


        //original
        // lens.style.opacity = mapRange(cursorX, 0, window.innerWidth, 0, 1);
        // lens.style.filter = `grayscale(${mapRange(cursorY, 0, window.innerHeight, 50, 100)}%)`;


        // output.style.background = `url('${data}') center/cover no-repeat`;
        // output.style.transform = "scale(3)";

        let newCtx = lens.getContext('2d');
        if (newCtx) {
            newCtx.drawImage(webcam, cropX, cropY, cropSize, cropSize, cursorX - cropSize / 2, cursorY - cropSize / 2, cropSize, cropSize);
        }
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

    function mapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    
}

// original code
// let lens = document.getElementById('lens');

// let style = window.getComputedStyle(lens);

// let output = document.getElementById('output');

// let tempbutton = document.querySelector('#tempbutton');

// let cropSize;
// let cropX; 
// let cropY;

// tempbutton.addEventListener('click', (event) => { takeshot(event)});

// function takeshot(event) {
//     let rect = lens.getBoundingClientRect();
    
//     let cursorX = event.clientX -rect.left;
//     let cursorY = event.clientY -rect.top;
 
//     let imgX = (cursorX / lens.width) * 200
//     let imgY = (cursorY / lens.height) * 100

//     let cropSize = 100;
//     let cropX = Math.max(0, imgX - cropSize / 2);
//     let cropY = Math.max(0, imgY - cropSize / 2);


//     // let width= 200;
//     // let height= 100;

//     // console.log(width, height);
//     // console.log(cropSize, cropX, cropY);

//     //original
//     lens.getContext('2d').drawImage(video, cropX, cropY, cropSize, cropSize, 0, 0, lens.width, lens.height);

//     let data = lens.toDataURL('image/png');
//     output.style.background = `url('${data}') center/cover no-repeat`;
//     output.style.transform = "scale(3)";
// }