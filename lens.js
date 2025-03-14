let lens = document.getElementById('lens');

let style = window.getComputedStyle(lens);

let output = document.getElementById('output');

let tempbutton = document.querySelector('#tempbutton');

let cropSize;
let cropX; 
let cropY;

tempbutton.addEventListener('click', (event) => { takeshot(event)});

function takeshot() {
    let rect = lens.getBoundingClientRect();
    
    let cursorX = event.clientX - rect.left;
    let cursorY = event.clientY - rect.top;
 
    let imgX = (cursorX / lens.width) * 200;
    let imgY = (cursorY / lens.height) * 100;

    let cropSize = 100;
    let cropX = Math.max(0, imgX - cropSize / 2);
    let cropY = Math.max(0, imgY - cropSize / 2);

    let drawX = (lens.width - cropSize) / 2;
    let drawY = (lens.height - cropSize) / 2;

    let context = lens.getContext('2d');
    context.drawImage(video, cropX, cropY, cropSize, cropSize, drawX, drawY, cropSize, cropSize);

    let imageData = context.getImageData(0, 0, lens.width, lens.height);
    let data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 2;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    context.putImageData(imageData, 0, 0);

    let dataURL = lens.toDataURL('image/png');
    output.style.background = `url('${dataURL}') center/cover no-repeat`;
    output.style.transform = "scale(3)";
}



// function scaleLens() {
//     let scale = 5;
//     lens.width = video.videoWidth / scale;
//     lens.height = video.videoHeight / scale;
// }
