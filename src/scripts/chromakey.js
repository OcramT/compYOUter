// // Prepare bufferArray to store video data.
// function bufferPrepare(bufferVal) {
//     bufferArr = [];
//     for (var i = 0; i < bufferVal; i++) {
//         bufferArr.push(new Uint8Array(width * height))
//     }
// }

// function readFrame() {
//     try {
//         ctx.drawImage(video, 0, 0, width, height);
//     } catch (e) {
//         return null
//     }

//     return ctx.getImageData(0, 0, width, height);
// }

// function measureLightChanges(data) {
//     //Select the next frame from the buffer.
//     var buffer = bufferArr[bufferIdx++ % bufferArr.length];  

//     for (var i = 0, j = 0; i < buffer.length; i++, j += 4) {
//         // Determine lightness value.
//         var current = greyScale(data[j], data[j + 1], data[j + 2]);

//         // Set color to black.
//         data[j] = data[j + 1] = data[j + 2] = 0;
//         // Full opacity for changes.
//         data[j + 3] = 255 * lightnessHasChanged(i, current);
//         // Store current lightness value.
//         buffer[i] = current;
//     }
// }

// function lightnessHasChanged(index, value) {
//     return bufferArr.some(function(buffer) {
//         return Math.abs(value - buffer[index]) >= 20;
//     })
// }