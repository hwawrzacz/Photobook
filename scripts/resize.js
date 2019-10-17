//resize
const resize = (image, handler) => {
    var resizeEvenly = false;

    const initializeResizing = (event) => {
        event.stopPropagation();
        event.preventDefault();
        getStartingMouseCoordinates(event);

        getImageSize();
        page.addEventListener("mousemove", resizeElement);
        page.addEventListener("mouseup", stopResize);
        handler.addEventListener("mouseup", stopResize);
    }

    const resizeElement = (event) => {
        getMouseCoordinates(event);

        if (event.shiftKey) {
            const newWidth = mouseX - mouseX0 + imageWidth;
            resizeRatio = newWidth/imageWidth;
            image.style.setProperty("width",  imageWidth*resizeRatio + "px");
            image.style.setProperty("height", imageHeight*resizeRatio + "px");
        }
        else {
            image.style.setProperty("width",  mouseX - mouseX0 + imageWidth + "px");
            image.style.setProperty("height", mouseY - mouseY0 + imageHeight + "px");
        }
    }

    const stopResize = () => {
        page.removeEventListener("mousemove", resizeElement);
        page.removeEventListener("mouseup", stopResize);
    }

    const handleKeypress = (event) => {
        console.log(event.shiftKey);
    }

    handler.addEventListener("mousedown", initializeResizing);
}

function getMouseCoordinates(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}

function getStartingMouseCoordinates(event) {
    mouseX0 = event.pageX;
    mouseY0 = event.pageY;
}