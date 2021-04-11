import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { disposeVariables } from '@tensorflow/tfjs';
import { drawKeypoints, drawFace } from '../src/scripts/draw';

import { setupPoseNet, pose, poseConfidence, nose } from "./scripts/pose";

// console.log(pose)

document.addEventListener('DOMContentLoaded', async () => {
// window.onload = async () => {
    const video = document.getElementById('video');
    const width = video.width;
    const height = video.height;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height

    // const canvas2 = document.getElementById('canvas2')
    // const ctx2 = canvas.getContext('2d');
    // canvas2.width = width
    // canvas2.height = height
    // console.log(pose)
    await setupPoseNet();
    // console.log(pose)
    // debugger
    video.addEventListener('play', () => {
        // console.log(pose)
        setInterval(async () => {
            // debugger
            if (pose) {
                ctx.clearRect(0, 0, width, height)
                drawFace(pose["keypoints"], 0.8, ctx, 1);
            }

        }, 1)
    })

    disposeVariables()
// }
});



