//move
let mouseX;
let mouseY;
let mouseX0;
let mouseY0;

let elementWidth;
let elementHeight;
let elementPositionTop;
let elementPositionLeft;

const move = (element) => {

   const initializeMoving = (event) => { 
        getElementPosition(element);
        getElementSize(element);
        getStartingMouseCoordinates(event);

        page.addEventListener("mousemove", moveElement);
        page.addEventListener("mouseup", stopMoving);
    }

    const moveElement = (event) => {
        getMouseCoordinates(event);   
        let newLeft = mouseX - mouseX0 + elementPositionLeft;
        let newTop = mouseY - mouseY0 + elementPositionTop;
        
        element.style.setProperty("top", newTop + "px");
        element.style.setProperty("left", newLeft + "px");
        
        showInfo(getElementProperties(element));
    }

    const stopMoving = () => {
        page.removeEventListener("mousemove", moveElement);
        page.removeEventListener("mouseup", stopMoving);
    }

    element.addEventListener("mousedown", initializeMoving);
}