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
