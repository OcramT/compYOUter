import * as posenet from '@tensorflow-models/posenet';
import { setupVideo } from './video';
import "babel-polyfill";
import {dispose, disposeVariables} from '@tensorflow/tfjs'

let videoElement = document.getElementById('video');

const scaleFactor = 0.50;
const flipHorizontal = true;
const outputStride = 16;

export var pose
export var poseKeypoints

var net = posenet.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    inputResolution: 516,
    multiplier: 0.75,
});

var animationReq;

const loadVideo = async () => {
    const video = await setupVideo();
    video.play();
    return video
}

export const setupPoseNet = async () => {
    net = await posenet.load({
        architecture: "MobileNetV1", 
        outputStride: 16,
        inputResolution: 516,
        multiplier: 0.75,
    });
    videoElement = await loadVideo();

    await detectPoseInRealTime(video);
    disposeVariables();
} 

const detectPoseInRealTime = async (video) => {
    async function poseDetectionFrame() {
        net = await posenet.load({
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
        poseKeypoints = keypoints 

        animationReq = requestAnimationFrame(poseDetectionFrame);
        dispose(pose);
        dispose(keypoints);
        dispose(net);
        disposeVariables();
    }
    poseDetectionFrame();
    disposeVariables();
    dispose(poseDetectionFrame())
}

export const removePoseNet = () => {
    net = null
    pose = null
    cancelAnimationFrame(animationReq)
}
