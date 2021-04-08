import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { disposeVariables } from '@tensorflow/tfjs';
import { drawKeypoints } from '../src/scripts/draw';

import { setupPoseNet, pose, poseConfidence } from "./scripts/pose";

window.onload = async () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.getElementById('video');
    const width = video.width;
    const height = video.height;
    canvas.width = width
    canvas.height = height

    await setupPoseNet();

    video.addEventListener('play', () => {
        setInterval(async () => {
            if (pose) {
                ctx.clearRect(0, 0, width, height)
                drawKeypoints(pose["keypoints"], 0.8, ctx);
            }

        }, 1)
    })
    disposeVariables()
}



