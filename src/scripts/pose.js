import * as posenet from '@tensorflow-models/posenet';
import { setupVideo } from './video';
import "babel-polyfill";
import {dispose, disposeVariables, tidy} from '@tensorflow/tfjs'

let videoElement = document.getElementById('video');

const scaleFactor = 0.50;
const flipHorizontal = false;
const outputStride = 16;

export var rightHand
export var pose

export const setupPoseNet = async () => {
    let net = await posenet.load({
        architecture: "MobileNetV1", 
        outputStride: 16,
        inputResolution: {width: 720, height: 560},
        multiplier: 0.75,
    });
    videoElement = await loadVideo();

    detectPoseInRealTime(video);
    disposeVariables();
} 

const loadVideo = async () => {
    const video = await setupVideo();
    video.play();
    return video
}

const detectPoseInRealTime = async (video) => {
    async function poseDetectionFrame() {
        let net = await posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: 513,
            multiplier: 0.75,
        });

        pose = await net.estimateSinglePose(
            videoElement,
            scaleFactor,
            flipHorizontal,
            outputStride
        );

        let minPoseConfidence = 0.5
        let minPartConfidence = 0.5

        const {score, keypoints} = pose;        
        
        rightHand = keypoints[10];
        
        let partScore = keypoints[10]['score']
        
        if (score >= minPoseConfidence && partScore >= minPartConfidence) {
            const {position} = rightHand
        }


        requestAnimationFrame(poseDetectionFrame);
        dispose(pose);
        dispose(score);
        dispose(keypoints);
        dispose(partScore);
        dispose(net);
        disposeVariables();
    }
    poseDetectionFrame();
    disposeVariables();
    dispose(poseDetectionFrame())
}