export function drawKeypoints(keypoint, minConfidence, ctx, scale = 1) {
    // const keypoint = keypoints[10];

    // if (keypoint.score < minConfidence) {
        const { y, x } = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 15);
    // }

}

export function drawPoint(ctx, y, x, r = 3, color = '#E699C8') {
    ctx.beginPath();
    ctx.arc(x * 1, y * 1, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}