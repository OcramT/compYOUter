import * as posenet from '@tensorflow-models/posenet';
import { setupVideo } from './video';
import "babel-polyfill";
import {dispose, disposeVariables} from '@tensorflow/tfjs'

let videoElement = document.getElementById('video');

const scaleFactor = 0.50;
const flipHorizontal = true;
const outputStride = 16;

export var pose

export const setupPoseNet = async () => {
    let net = await posenet.load({
        architecture: "MobileNetV1", 
        outputStride: 16,
        inputResolution: 516,
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
            inputResolution: 516,
            multiplier: 0.75,
        });

        pose = await net.estimateSinglePose(
            videoElement,
            scaleFactor,
            flipHorizontal,
            outputStride
        );

        const {score, keypoints} = pose;        

        requestAnimationFrame(poseDetectionFrame);
        dispose(pose);
        dispose(score);
        dispose(keypoints);
        dispose(net);
        disposeVariables();
    }
    poseDetectionFrame();
    disposeVariables();
    dispose(poseDetectionFrame())
}