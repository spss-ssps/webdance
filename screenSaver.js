document.getElementById("cameraCapture").addEventListener("click", function () {
    html2canvas(contentArea, { 
        useCORS: true,
        ignoreElements: function(element) {
            return element.tagName === 'VIDEO' || element.tagName === 'CANVAS';
        }
    }).then(function (canvas) {
        var imgUrl = canvas.toDataURL();

        var link = document.createElement('a');
        link.href = imgUrl;
        link.download = 'screenshot.png';
        link.click();
    }).catch(function(err) {
        // Improved error logging with full details
        console.error("Error during html2canvas capture:", err.message);
        if (err.stack) {
            console.error("Stack trace:", err.stack);  // Log the stack trace if available
        } else {
            console.error("No stack trace available");
        }

        // Display the error message to the user
        errorMessageElement.style.display = 'block';
        errorMessageElement.textContent = 'Something went wrong while capturing the screenshot. Please try again.';
    });
});
