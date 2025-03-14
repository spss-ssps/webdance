let lens = document.getElementById('lens');

let style = window.getComputedStyle(lens);

let output = document.getElementById('output');

let tempbutton = document.querySelector('#tempbutton');

let cropSize;
let cropX; 
let cropY;

tempbutton.addEventListener('click', (event) => { takeshot(event)});

function takeshot(event) {
    let rect = lens.getBoundingClientRect();
    
    let cursorX = event.clientX -rect.left;
    let cursorY = event.clientY -rect.top;
 
    let imgX = (cursorX / lens.width) * 200
    let imgY = (cursorY / lens.height) * 100

    let cropSize = 100;
    let cropX = Math.max(0, imgX - cropSize / 2);
    let cropY = Math.max(0, imgY - cropSize / 2);


    // let width= 200;
    // let height= 100;

    // console.log(width, height);
    // console.log(cropSize, cropX, cropY);

    //original
    lens.getContext('2d').drawImage(video, cropX, cropY, cropSize, cropSize, 0, 0, lens.width, lens.height);
    
    let data = lens.toDataURL('image/png');
    output.style.background = `url('${data}') center/cover no-repeat`;
    output.style.transform = "scale(3)";
}



// function scaleLens() {
//     let scale = 5;
//     lens.width = video.videoWidth / scale;
//     lens.height = video.videoHeight / scale;
// }
