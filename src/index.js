import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import { drawFace, drawRobot } from '../src/scripts/draw';
import { endStream } from '../src/scripts/video'

import { setupPoseNet, removePoseNet, pose, poseKeypoints} from "./scripts/pose";

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
                        ctx.clearRect(0, 0, width, height);
                        drawFace(poseKeypoints, 0.8, ctx, 1);
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
                        ctx.clearRect(0, 0, width, height);
                        drawRobot(poseKeypoints, 0.8, ctx, 1);
                    }
                }, 1)
            })
        } else if (robotButton.checked) {
            endStream() 
            removePoseNet() 
        } 
    }) 

    tf.disposeVariables()
});

