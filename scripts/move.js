//move
var mouseX;
var mouseY;
var mouseX0;
var mouseY0;

var imageWidth;
var imageHeight; 
var imagePositionTop;
var imagePositionLeft;

const move = (image) => {
    const pageWidth = parseInt(getComputedStyle(page).getPropertyValue("width")); 
    const pageHeight = parseInt(getComputedStyle(page).getPropertyValue("height"));  
    
   const initializeMoving = (event) => { 
        event.stopPropagation();
        event.preventDefault();
        
        getImagePosition();
        getImageSize();
        getStartingMouseCoordinates(event);

        image.addEventListener("mousemove", moveElement);
        page.addEventListener("mouseup", stopMoving);
    }

    const moveElement = (event) => {
        getMouseCoordinates(event);   
        var newLeft = mouseX - mouseX0 + imagePositionLeft;
        var newTop = mouseY - mouseY0 + imagePositionTop;
        
        if (newLeft < 0) newLeft = 0;
        else if (newLeft > pageWidth - imageWidth) 
            newLeft = pageWidth - imageWidth;

        if (newTop < 0) newTop = 0;
        else if (newTop > pageHeight - imageHeight) 
            newTop = pageHeight - imageHeight;
        
        image.style.setProperty("top", newTop + "px");
        image.style.setProperty("left", newLeft + "px");
    }

    const stopMoving = () => {
        image.removeEventListener("mousemove", moveElement);
        page.removeEventListener("mouseup", stopMoving);
    }

    image.addEventListener("mousedown", initializeMoving);
}

function getImageSize() {    
    imageWidth = getImageWidth();
    imageHeight = getImageHeight();
}

function getImagePosition() {    
    imagePositionTop = getImagePositionTop();
    imagePositionLeft = getImagePositionLeft();
}

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}

function getImageWidth() {
    return parseInt(getComputedStyle(image).getPropertyValue("width"));
}

function getImageHeight() {
    return parseInt(getComputedStyle(image).getPropertyValue("height"));
}

function getImagePositionTop() {
    return parseInt(getComputedStyle(image).getPropertyValue("top"));
}

function getImagePositionLeft() {
    return parseInt(getComputedStyle(image).getPropertyValue("left"));
}