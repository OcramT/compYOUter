import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { disposeVariables } from '@tensorflow/tfjs'

import { setupPoseNet, rightHand } from "./scripts/pose";

// document.addEventListener("DOMContentLoaded", () => {
window.onload = async () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let video = document.getElementById('video');
    video.width = 720;
    video.height = 560;
    const width = video.videoWidth;
    const height = video.videoHeight;

    await setupPoseNet();
    
    video.addEventListener('play', () => {
        setInterval(async () => {
            await rightHand
            const poseX = rightHand['position']['x']
            const poseY = rightHand['position']['y']
            console.log(poseX)
            console.log(poseY)
            ctx.drawImage(video, 0, 0, width, height)
            ctx.fillRect(poseX, poseY, 10, 10);
        }, 200)

    })
    disposeVariables()
}
// });



