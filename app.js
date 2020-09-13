const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const image = new Image();
const reader = new FileReader();

const uploadImage = function(e) {
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        image.src = reader.result;
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
    };
}

const greyscale = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
        data[i] = grey;
        data[i + 1] = grey;
        data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}

const sepia = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const grey = data[i] * 0.21 + data[i + 1] * 0.71 + data[i + 2] * 0.07;
        data[i] = grey + 95;
        data[i + 1] = grey + 58;
        data[i + 2] = grey;
    }
    ctx.putImageData(imageData, 0, 0);
}

const invert = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
}

const rbg = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const green = data[i + 1];
        data[i] = data[i];
        data[i + 1] = data[i + 2];
        data[i + 2] = green;
    }
    ctx.putImageData(imageData, 0, 0);
}

const bgr = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const red = data[i];
        data[i] = data[i + 2];
        data[i + 1] = data[i + 1];
        data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}

const gbr = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const red = data[i];
        data[i] = data[i + 1];
        data[i + 1] = data[i + 2];
        data[i + 2] = red;
    }
    ctx.putImageData(imageData, 0, 0);
}

const grb = function() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        const red = data[i];
        data[i] = data[i + 1];
        data[i + 1] = red;
        data[i + 2] = data[i + 2];
    }
    ctx.putImageData(imageData, 0, 0);
}

const clearChanges = function() {
    image.src = reader.result;
}

const download = function() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "image.png";
    link.click();
}

const imageLoader = document.getElementById('uploader');
imageLoader.addEventListener('change', uploadImage);
document.querySelectorAll('button')[0].addEventListener('click', greyscale);
document.querySelectorAll('button')[1].addEventListener('click', sepia);
document.querySelectorAll('button')[2].addEventListener('click', invert);
document.querySelectorAll('button')[3].addEventListener('click', rbg);
document.querySelectorAll('button')[4].addEventListener('click', bgr);
document.querySelectorAll('button')[5].addEventListener('click', gbr);
document.querySelectorAll('button')[6].addEventListener('click', grb);
document.querySelectorAll('button')[7].addEventListener('click', clearChanges);
document.querySelectorAll('button')[8].addEventListener('click', download);