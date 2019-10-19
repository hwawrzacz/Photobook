const page = document.querySelector(".page-container");
const image = document.querySelector(".image");
const textBox = document.querySelector(".textbox-container");
const hookResize = document.querySelector(".hook-resize");
const hookRotate = document.querySelector(".hook-rotate");
const creatorButton = document.querySelector(".add-object-button");

resize(image, hookResize);
move(image);
move(textBox);
rotateElement(image, hookRotate);
rotateElement(textBox, hookRotate);
addTextBox(creatorButton);

function getData() {
    var object = "width: " + getElementWidth(image);
    object += "<br /> height: " + getElementHeight(image);
    object += "<br /> top: " + getElementPositionTop(image);
    object += "<br /> left: " + getElementPositionLeft(image);
    object += "<br /> rotation: " + getComputedStyle(image).getPropertyValue("transform");

    const el = document.querySelector(".test");
    el.innerHTML = object;
}

function getElementSize(element) {    
    elementWidth = getElementWidth(element);
    elementHeight = getElementHeight(element);
}

function getElementPosition(element) {    
    elementPositionTop = getElementPositionTop(element);
    elementPositionLeft = getElementPositionLeft(element);
}

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}

function getElementWidth(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("width"));
}

function getElementHeight(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("height"));
}

function getElementPositionTop(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("top"));
}

function getElementPositionLeft(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("left"));
}