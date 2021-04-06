import "./styles/index.scss";
import  "./scripts/pose";

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import * as posenet from '@tensorflow-models/posenet';

import {setupVideo} from "./scripts/video";
import { setupPoseNet } from "./scripts/pose";

document.addEventListener("DOMContentLoaded", () => {
    setupPoseNet();
});

// window.onload = async () => {
//     setupPoseNet();
// }
