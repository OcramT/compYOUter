import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { dispose, disposeVariables } from '@tensorflow/tfjs';
import { drawFace, drawRobot } from '../src/scripts/draw';
import * as posenet from '@tensorflow-models/posenet';

import { setupPoseNet, removePoseNet, pose} from "./scripts/pose";

const endStream = () => {
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function (track) {
        track.stop();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const width = video.width;
    const height = video.height;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height

    const compButton = document.getElementById('switch-comp')
    const robotButton = document.getElementById('switch-robot')

    compButton.addEventListener('change', async () => {

        if (!compButton.checked) {
            robotButton.checked = true
            setupPoseNet();
            video.addEventListener('play', () => {
                setInterval(async () => {
                    if (pose) {
                        ctx.fillStyle = 'transparent';
                        ctx.clearRect(0, 0, width, height);
                        drawFace(pose["keypoints"], 0.8, ctx, 1);
                    }
                }, 1)
            })
        } else if (compButton.checked) {
            endStream()
            removePoseNet()
        }
    })
    
    robotButton.addEventListener('change', async () => {

        if (!robotButton.checked) {
            compButton.checked = true
            await setupPoseNet();
            video.addEventListener('play', () => {
                setInterval(async () => {
                    if (pose) {
                        ctx.fillStyle = 'transparent';
                        ctx.clearRect(0, 0, width, height);
                        drawRobot(pose["keypoints"], 0.8, ctx, 1);
                    }
                }, 1)
            })
        } else if (robotButton.checked) {
            endStream() 
            removePoseNet() 
        } 
    }) 

    disposeVariables()
});

