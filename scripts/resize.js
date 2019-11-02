//resize
const resizeElement = (target, hook) => {
    let initialWidth;
    let initialHeight;

    const initializeResizing = (event) => {
        event.stopPropagation();
        event.preventDefault();

        getStartingMouseCoordinates(event);
        initialWidth = target.width;
        initialHeight = target.height;

        page.addEventListener("mousemove", resize);
        page.addEventListener("mouseup", stopResize);
        hook.addEventListener("mouseup", stopResize);
    }

    const resize = (event) => {
        getMouseCoordinates(event);

        if (event.shiftKey) {
            const newWidth = mouseX - mouseX0 + initialWidth;
            const resizeRatio = newWidth/initialWidth;
            target.width = initialWidth * resizeRatio;
            target.height = initialHeight * resizeRatio;
        }
        else {
            const newWidth = mouseX - mouseX0 + initialWidth;
            const newHeight = mouseY - mouseY0 + initialHeight;
            target.width = newWidth;
            target.height = newHeight;
        }
        
        showInfo(getElementProperties(target.element));
    }

    const stopResize = () => {
        page.removeEventListener("mousemove", resize);
        page.removeEventListener("mouseup", stopResize);
    }

    hook.addEventListener("mousedown", initializeResizing);
}