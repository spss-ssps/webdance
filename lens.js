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
}