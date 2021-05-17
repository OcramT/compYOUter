import * as posenet from '@tensorflow-models/posenet';
import { setupVideo } from './video';
import "babel-polyfill";
import {dispose, disposeVariables} from '@tensorflow/tfjs'
import * as tf from '@tensorflow/tfjs';

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

export const setupPoseNet = async () => {
    net = await posenet.load({
        architecture: "MobileNetV1", 
        outputStride: 16,
        inputResolution: 516,
        multiplier: 0.75,
    });
    videoElement = await loadVideo();

    detectPoseInRealTime(video);
    tf.disposeVariables();
} 

const loadVideo = async () => {
    const video = await setupVideo();
    video.play();
    return video
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
        tf.dispose(pose);
        tf.dispose(keypoints);
        tf.dispose(net);
        tf.disposeVariables();
    }
    poseDetectionFrame();
    tf.disposeVariables();
    tf.dispose(poseDetectionFrame())
}

export const removePoseNet = () => {
    net = null
    pose = null
    cancelAnimationFrame(animationReq)
}
