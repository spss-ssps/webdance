let lens = document.getElementById('lens');

let style = window.getComputedStyle(lens);

let output = document.getElementById('output');

let tempbutton = document.querySelector('#tempbutton');

tempbutton.addEventListener('click', () => {takeshot()});

function takeshot() {

    let width= 200;
    let height= 100;

    // let width= style.width;
    // let height= style.height;
    
    console.log(width, height);

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

document.onmousemove = function (e) {
    let cursorX = e.pageX
    let cursorY = e.pageY;

    console.log(cursorX, cursorY);
}