// 合适的展示图片，类似于
// background-position: center center;
// backgruond-size: cover 属性;
function getCoverImageArea(showWidth, showHeight, imgWidth, imgHeight) {

    // 要绘制到显示区域的图片的左上角x,y
    let sx, sy;

    // 要绘制到显示区域的图片尺寸
    let sWidth, sHeight;

    // 图片的原始宽高比
    const originRate = imgWidth / imgHeight;

    // 显示区域的宽高比
    const areaRate = showWidth / showHeight;

    if (originRate > areaRate) {
        sy = 0;
        sHeight = imgHeight;
        sWidth = sHeight * areaRate;
        sx = Math.abs((showWidth * imgHeight / showHeight - imgWidth) / 2);
    } else if (originRate === areaRate) {
        sx = sy = 0;
        sWidth = imgWidth;
        sHeight = imgHeight;
    } else if (originRate < areaRate) {
        sx = 0;
        sy = Math.abs((imgWidth * showHeight / showWidth - imgHeight) / 2);
        sWidth = imgWidth;
        sHeight = sWidth / areaRate;
    }

    return [sx, sy, sWidth, sHeight];
}

function canvasTextAutoLine(str, ctx, initX, initY, lineHeight, canvasWidth) {
    const arrText = str.split(''); //字符串分割为数组
    let currentText = ''; // 当前字符串及宽度
    let currentWidth;
    for (const letter of arrText) {
        currentText += letter;
        currentWidth = ctx.measureText(currentText).width;
        if (currentWidth > canvasWidth) {
            ctx.fillText(currentText.slice(0, currentText.length - 1), initX, initY);
            currentText = letter;
            initY += lineHeight;
        }
    }
    if (currentText) {
        ctx.fillText(currentText, initX, initY);
    }
}

// 绘制圆角矩形
function drawRoundRect(ctx, x, y, width, height, radius, fillColor) {
    const { PI } = Math;
    ctx.setFillStyle(fillColor);
    ctx.beginPath();
    ctx.arc(radius, radius, radius, PI, PI * 3 / 2);
    ctx.lineTo(width - x, y);
    ctx.arc(width - radius, radius, radius, PI * 3 / 2, 0);
    ctx.lineTo(width, height - radius);
    ctx.arc(width - radius, height - radius, radius, 0, PI / 2);
    ctx.lineTo(radius, height);
    ctx.arc(radius, height - radius, radius, PI / 2, PI);
    ctx.lineTo(x, y + radius);
    ctx.closePath();
    ctx.fill();
}