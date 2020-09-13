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

const imageLoader = document.getElementById('uploader');
imageLoader.addEventListener('change', uploadImage);
document.querySelectorAll('button')[0].addEventListener('click', greyscale);
document.querySelectorAll('button')[1].addEventListener('click', sepia);
document.querySelectorAll('button')[2].addEventListener('click', invert);