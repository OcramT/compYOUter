import "babel-polyfill";
import adapter from 'webrtc-adapter';

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