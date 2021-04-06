import * as posenet from '@tensorflow-models/posenet';
import { setupVideo } from './video';
import "babel-polyfill";


let videoElement = document.getElementById('video');
const scaleFactor = 0.50;
const flipHorizontal = true;
const outputStride = 16;

export const setupPoseNet = async () => {
    let net = await posenet.load({
        architecture: "MobileNetV1", 
        outputStride: 16,
        inputResolution: 513,
        multiplier: 0.75,
    });
    videoElement = await loadVideo();

    detectPoseInRealTime(video);
} 

const loadVideo = async () => {
    const video = await setupVideo();
    video.play();
    return video
}

const detectPoseInRealTime = async (video) => {
    async function poseDetectionFrame() {
        let poses = [];
        let net = await posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: 513,
            multiplier: 0.75,
        });

        const pose = await net.estimateSinglePose(
            videoElement,
            scaleFactor,
            flipHorizontal,
            outputStride
        );
        poses.push(pose);

        let minPoseConfidence = 0.5
        let minPartConfidence = 0.5

        poses.forEach(({score, keypoints}) => {
            // const rightHand = keypoints.find(keypoint => {
            //     return keypoint.part === "rightWrist"
            // }) 

            // const partScore = keypoints.find(keypoint => {
            //     if (rightHand) return keypoint.score
            // })
            let partScore = keypoints[10]['score']
 
            if (score >= minPoseConfidence && partScore >= minPartConfidence) {
                console.log(keypoints[10]);
            }
            // debugger
        })

        requestAnimationFrame(poseDetectionFrame);
    }
    
    poseDetectionFrame();
}

//pose contains 1. pose confidence score & 2. array of 17 keypoints
//each keypoint contains 1. keypoint position (x,y) & 2. keypoint confidence score

// const scores = heatmap.sigmoid();
// const heatmapPositions = scores.armax(y, x);
// const offsetVectors = [offsets.get(y, x, k), offsets.get(y, x, 17 + k)];
// const keypointPositions = heatmapPositions * outputStride + offsetVectors

// console.log(keypointPositions);
