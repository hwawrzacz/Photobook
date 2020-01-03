let mouseX;
let mouseY;
let mouseX0;
let mouseY0;

let elementWidth;
let elementHeight;
let elementPositionTop;
let elementPositionLeft;

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}

function showInfo(content) {
    const infoBox = document.querySelector(".test");
    infoBox.innerHTML = content;
}

function getElementProperties(target) {
    let elementProperties = "width: " + target.width;
    elementProperties += "<br /> height: " + target.height;
    elementProperties += "<br /> top: " + target.top;
    elementProperties += "<br /> left: " + target.left;
    // const cosine = getRotationCos(target);
    elementProperties += "<br /> rotation: " + target.rotation;

    return elementProperties;
}