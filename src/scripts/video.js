import "babel-polyfill";

export const setupVideo = async () => {

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
    
    var video = document.getElementById("video");
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: 560, 
            width: 700,
            facingMode: "user",
        },
    });
    video.height = 560
    video.width = 700
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => { 
            resolve(video);
    }})
};

export const endStream = (video) => {
    // console.log('endStream function', video)
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    })
}