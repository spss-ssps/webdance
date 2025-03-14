document.getElementById('triggerImage').addEventListener('click', function() {
    //play sound when clicked
    document.getElementById('cameraSound').play();

    //get the lens element
    var lensContainer = document.getElementById('lens');
    
    // get the current opacity and grayscale values
    let lensStyles = window.getComputedStyle(lensContainer);
    let currentOpacity = parseFloat(lensStyles.opacity);
    let grayscaleValue = lensStyles.filter.match(/grayscale\((\d+)%\)/);
    let currentGrayscale = grayscaleValue ? parseInt(grayscaleValue[1], 10) : 100;

    
    html2canvas(lensContainer, {
        backgroundColor: '#000', 
        logging: true,             
        useCORS: true,           
    }).then(function(canvas) {
        let context = canvas.getContext('2d');

        context.globalCompositeOperation = 'saturation';
        context.fillStyle = 'gray';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //opacity
        context.globalAlpha = currentOpacity;
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //grayscale
        if (currentGrayscale > 0) {
            context.globalCompositeOperation = 'saturation';
            context.fillStyle = 'gray';
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        let img = canvas.toDataURL("image/png");

        // download image
        let link = document.createElement('a');
        link.href = img;
        link.download = 'screenshot.png';
        link.click(); 
    }).catch(function(err) {
        console.error("Error capturing canvas:", err);
    });
});
