//resize
const resizeElement = (element, handler) => {
    var resizeEvenly = false;

    const initializeResizing = (event) => {
        event.stopPropagation();
        event.preventDefault();
        getStartingMouseCoordinates(event);

        getElementSize(element);
        page.addEventListener("mousemove", resize);
        page.addEventListener("mouseup", stopResize);
        handler.addEventListener("mouseup", stopResize);
    }

    const resize = (event) => {
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
        
        getData(element);
    }

    const stopResize = () => {
        page.removeEventListener("mousemove", resize);
        page.removeEventListener("mouseup", stopResize);
    }

    handler.addEventListener("mousedown", initializeResizing);
}