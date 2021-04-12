import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { disposeVariables } from '@tensorflow/tfjs';
import { drawFace, drawRobot } from '../src/scripts/draw';

import { setupPoseNet, pose, poseConfidence, nose } from "./scripts/pose";

document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('video');
    const width = video.width;
    const height = video.height;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height

    const compButton = document.getElementById('compmoji')
    const robotButton = document.getElementById('robotify')

    const robotify = robotButton.addEventListener('click', async () => {
        await setupPoseNet();
    
        video.addEventListener('play', () => {
            setInterval(async () => {
                if (pose) {
                    ctx.clearRect(0, 0, width, height)
                    drawRobot(pose["keypoints"], 0.8, ctx, 1);
                }
            }, 1)
        })
    })

    compButton.addEventListener('click', async () => {
        await setupPoseNet();

        video.addEventListener('play', () => {
            setInterval(async () => {
                if (pose) {
                    ctx.clearRect(0, 0, width, height)
                    drawFace(pose["keypoints"], 0.8, ctx, 1);
                }
            }, 1)
        })
    })

    disposeVariables()
});



