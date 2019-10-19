//resize
const resize = (element, handler) => {
    var resizeEvenly = false;

    const initializeResizing = (event) => {
        event.stopPropagation();
        event.preventDefault();
        getStartingMouseCoordinates(event);

        getElementSize(element);
        page.addEventListener("mousemove", resizeElement);
        page.addEventListener("mouseup", stopResize);
        handler.addEventListener("mouseup", stopResize);
    }

    const resizeElement = (event) => {
        getMouseCoordinates(event);

        if (event.shiftKey) {
            const newWidth = mouseX - mouseX0 + elementWidth;
            resizeRatio = newWidth/elementWidth;
            element.style.setProperty("width",  elementWidth*resizeRatio + "px");
            element.style.setProperty("height", elementHeight*resizeRatio + "px");
        }
        else {
            element.style.setProperty("width",  mouseX - mouseX0 + elementWidth + "px");
            element.style.setProperty("height", mouseY - mouseY0 + elementHeight + "px");
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