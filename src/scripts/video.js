import "babel-polyfill";

// if (navigator.mediaDevices === undefined) {
//     navigator.mediaDevices = {};
// } 

// if (navigator.mediaDevices.getUserMedia === undefined) {
//     navigator.mediaDevices.getUserMedia = (constraints) => {
//         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//         if (!getUserMedia) {
//             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
//         }

//         return new Promise((resolve, reject) => {
//             getUserMedia.call(navigator, constraints, resolve, reject);
//         });
//     }
// }

// export const setupVideo = () => {
//     const video = document.getElementById('video');
//     navigator.mediaDevices.getUserMedia({video: {}})
//         .then((stream) => {
//             if ('srcObject' in video) {
//                 video.srcObject = stream;
//             } else {
//                 video.src = window.URL.createObjectURL(stream);
//             }

//             video.onloadedmetadata = (e) => {
//                 return video.play();
//             };
//         })
//         .catch((err) => {
//             return console.log(err.name + ':' + err.message);
//         });
// };

export const setupVideo = async () => {
    // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    //     throw new Error(
    //         "Browser API navigator.mediaDevices.getUserMedia not available"
    //     );
    // }

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = (constraints) => {
            let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }

            return new Promise((resolve, reject) => {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }

    const video = document.getElementById("video");

    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            facingMode: "user",
        },
    });
    video.srcObject = stream;

    return new Promise(
        (resolve) => (video.onloadedmetadata = () => resolve(video))
    );
};