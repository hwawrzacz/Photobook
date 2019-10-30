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

function getElementPositionBottom(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("bottom"));
}

function getElementPositionLeft(element) {
    return parseInt(getComputedStyle(element).getPropertyValue("left"));
}

function showInfo(content) {
    const infoBox = document.querySelector(".test");
    infoBox.innerHTML = content;
}

function getElementProperties(element) {
    let elementProperties = "width: " + getElementWidth(element);
    elementProperties += "<br /> height: " + getElementHeight(element);
    elementProperties += "<br /> top: " + getElementPositionTop(element);
    elementProperties += "<br /> left: " + getElementPositionLeft(element);
    elementProperties += "<br /> bottom: " + getElementPositionBottom(element);
    
    const cosine = getRotationCos(element);
    elementProperties += "<br /> rotation (cos&alpha;): " + cosine;

    return elementProperties;
}

function getRotationCos(element){
    const rotationProperty = getComputedStyle(element).getPropertyValue("transform")
    const rotationMatrix = rotationProperty.replace("matrix(", "").replace(")", "").split(",");
    const cosine = rotationMatrix[0];

    return cosine; 
}