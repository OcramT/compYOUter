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
    const video = document.getElementById('video');
    const width = video.width;
    const height = video.height;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height

    const canvas2 = document.getElementById('canvas2')
    const ctx2 = canvas.getContext('2d');
    canvas2.width = width
    canvas2.height = height

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



