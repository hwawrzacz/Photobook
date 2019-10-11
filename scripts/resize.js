//resize
const resize = (image, handler) => {
    const initializeResize = (event) => {
        getImageSize();
        event.stopPropagation();
        event.preventDefault();
        
        image.removeEventListener("mousemove", move);
        page.addEventListener("mousemove", resizeElement);
        page.addEventListener("mouseup", stopResize);
    }

    const resizeElement = (event) => {
        getMouseCoordinates(event);
        image.style.setProperty("width",  mouseX - mouseX0 + imageWidth + "px");
        image.style.setProperty("height", mouseY - mouseY0 + imageHeight + "px");
    }

    const stopResize = () => {
        handler.removeEventListener("mousemove", resizeElement);
        handler.removeEventListener("mouseup", stopResize);
    }

    //for some shitty reason, this must be at the end of the function
    page.addEventListener("mousedown", initializeResize); 
}

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}