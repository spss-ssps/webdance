let lens = document.getElementById('lens');

let style = window.getComputedStyle(lens);

let output = document.getElementById('output');

let tempbutton = document.querySelector('#tempbutton');

tempbutton.addEventListener('click', (event) => { 
    let cursorX = event.clientX
    let cursorY = event.clientY;
 
    takeshot()});

function takeshot() {

    let width= 200;
    let height= 100;

    // console.log(width, height);


    lens.getContext('2d').drawImage(video, 0, 0, width, height);

    let data = lens.toDataURL('image/png');
    output.style.background = `url('${data}') center/cover no-repeat`;
    output.style.transform = "scale(5)";
}
// function scaleLens() {
//     let scale = 5;
//     lens.width = video.videoWidth / scale;
//     lens.height = video.videoHeight / scale;
// }
