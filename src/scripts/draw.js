export function drawFace(keypoints, minConfidence, ctx, scale = 1) {
    drawHead(keypoints, minConfidence, ctx, scale = 1)
    drawLeftEye(keypoints, minConfidence, ctx, scale = 1)
    drawRightEye(keypoints, minConfidence, ctx, scale = 1)
    drawMouth(keypoints, minConfidence, ctx, scale = 1)
}

function drawHead(keypoints, minConfidence, ctx, scale = 1) {
    const keypoint = keypoints[0];
    if (keypoint.score >= minConfidence) {
        const { y, x } = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 100, '#E699C8');
    }
}

function drawLeftEye(keypoints, minConfidence, ctx, scale = 1) {
    const keypoint = keypoints[1];
    if (keypoint.score >= minConfidence) {
        const { y, x } = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 15, '#000000');
    }
}

function drawRightEye(keypoints, minConfidence, ctx, scale = 1) {
    const keypoint = keypoints[2];
    if (keypoint.score >= minConfidence) {
        const { y, x } = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 15, '#000000');
    }
}

function drawMouth(keypoints, minConfidence, ctx, scale = 1) {
    const keypoint = keypoints[0];
    if (keypoint.score >= minConfidence) {
        const { y, x } = keypoint.position;
        drawLine(ctx, (y - 100) * scale, x * scale, '#000000');
    }
}


export function drawPoint(ctx, y, x, r = 3, color) {
    ctx.beginPath();
    ctx.arc(x * 1, y * 1, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(ctx, y, x, color) {
    ctx.beginPath();
    ctx.moveTo(x - 50, y + 125);
    ctx.lineTo(x + 50, y + 125);
    ctx.fillStyle = color;
    ctx.lineWidth = 10;
    ctx.stroke();
}

// export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
//     for (let i = 0; i < keypoints.length; i++) {
//         const keypoint = keypoints[i];

//         if (keypoint.score < minConfidence) {
//             continue;
//         }

//         const { y, x } = keypoint.position;
//         drawPoint(ctx, y * scale, x * scale, 15);
//     }
// }