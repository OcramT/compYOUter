const video = document.getElementById('video');

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

const playVideo = () => {
    navigator.mediaDevices.getUserMedia({video: {}})
        .then((stream) => {
            if ('srcObject' in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }

            video.onloadedmetadata = (e) => {
                video.play();
            };
        })
        .catch((err) => {
            console.log(err.name + ':' + err.message);
        });
};

playVideo();