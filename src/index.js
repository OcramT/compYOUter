import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { disposeVariables } from '@tensorflow/tfjs';
import { drawFace, drawRobot } from '../src/scripts/draw';

import { setupPoseNet, pose} from "./scripts/pose";

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

    // if (!robotButton.checked) {

    robotButton.addEventListener('change', async () => {
        
        if (!robotButton.checked) {
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
        // } else if (robotButton.checked) {
        //     const stream = video.srcObject;
        //     const tracks = stream.getTracks();
        //     tracks.forEach(function(track) {
        //         track.stop();
        //     })
        //     video.srcObject = null;
    }

    robotButton.removeEventListener('change', async () => {
        if (robotButton.checked) {
            const stream = video.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            })
            video.srcObject = null;
            video.removeEventListener('play', () => {
                video.stop()
            })
        }
    })
           
            // if (!robotButton.checked) {
            // await setupPoseNet();
            // video.addEventListener('play', () => {
            //     setInterval(async () => {
            //         if (pose) {
            //             ctx.fillStyle = 'transparent';
            //             ctx.clearRect(0, 0, width, height);
            //             drawRobot(pose["keypoints"], 0.8, ctx, 1);
            //         }
            //     }, 1)
            // })
            // } else if (robotButton.checked) {
            //     const stream = video.srcObject;
            //     const tracks = stream.getTracks();
            //     tracks.forEach(function(track) {
            //         track.stop();
            //     })
            //     video.srcObject = null;
            // }

    compButton.addEventListener('change', async () => {
        await setupPoseNet();

        if (!compButton.checked) {
            video.addEventListener('play', () => {
                setInterval(async () => {
                    if (pose) {
                        ctx.clearRect(0, 0, width, height)
                        drawFace(pose["keypoints"], 0.8, ctx, 1);
                    }
                }, 1)
            })
        } else {
            video.stop()
            compButton.removeEventListener('change', compify)
        }
    })

    disposeVariables()
});


})
