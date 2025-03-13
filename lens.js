function trances(videoElement, zoom) {
  var lens = document.getElementById("lens");
  var lensContent = lens.querySelector(".lens-content");
  var traces = [];
  var snapshotCanvas = document.getElementById("snapshotCanvas");
  var snapshotCtx = snapshotCanvas.getContext("2d");

  // Update lens position and magnification effect
  lens.addEventListener("mousemove", function(event) {
      var lensSize = lens.offsetWidth;
      var lensX = event.offsetX - lensSize / 2;
      var lensY = event.offsetY - lensSize / 2;
      lens.style.left = lensX + "px";
      lens.style.top = lensY + "px";

      // Create the magnification effect
      lensContent.style.backgroundImage = `url(${videoElement.srcObject})`;
      lensContent.style.backgroundSize = `${videoElement.videoWidth * zoom}px ${videoElement.videoHeight * zoom}px`;
      lensContent.style.backgroundPosition = `-${lensX * zoom}px -${lensY * zoom}px`;

      // Track past traces (store position and timestamp)
      traces.push({ x: lensX + lensSize / 2, y: lensY + lensSize / 2, time: Date.now() });
      
      // Keep traces within a visible time frame (e.g., 2000ms)
      traces = traces.filter(trace => Date.now() - trace.time < 2000);
      
      // Draw traces (red circles)
      traces.forEach(function(trace) {
          var traceElement = document.createElement("div");
          traceElement.className = "trace";
          traceElement.style.left = `${trace.x - 25}px`;
          traceElement.style.top = `${trace.y - 25}px`;
          document.body.appendChild(traceElement);
          setTimeout(function() {
              traceElement.remove();
          }, 2000); // Remove trace after 2 seconds
      });
  });

  // Capture and save image on click
  lens.addEventListener("click", function(event) {
      var lensSize = lens.offsetWidth;
      var lensX = event.offsetX - lensSize / 2;
      var lensY = event.offsetY - lensSize / 2;

      // Draw the selected area to the snapshot canvas
      snapshotCtx.clearRect(0, 0, snapshotCanvas.width, snapshotCanvas.height);
      snapshotCtx.drawImage(
          videoElement,
          lensX, lensY, lensSize, lensSize, // Extract part of the video
          0, 0, snapshotCanvas.width, snapshotCanvas.height // Draw to snapshot canvas
      );
  });
}

// Call the magnify function and zoom level (e.g., 5x)
trances(document.querySelector("#webcam"), 5);