//move
var mouseX;
var mouseY;
var mouseX0;
var mouseY0;

var elementWidth;
var elementHeight;
var elementPositionTop;
var elementPositionLeft;

const move = (element) => {
    const pageWidth = parseInt(getComputedStyle(page).getPropertyValue("width")); 
    const pageHeight = parseInt(getComputedStyle(page).getPropertyValue("height"));  
    
   const initializeMoving = (event) => { 
        // event.stopPropagation();
        // event.preventDefault();
        
        getElementPosition(element);
        getElementSize(element);
        getStartingMouseCoordinates(event);

        page.addEventListener("mousemove", moveElement);
        page.addEventListener("mouseup", stopMoving);
    }

    const moveElement = (event) => {
        getMouseCoordinates(event);   
        var newLeft = mouseX - mouseX0 + elementPositionLeft;
        var newTop = mouseY - mouseY0 + elementPositionTop;
        
        // if (newLeft < 0) newLeft = 0;
        // else if (newLeft > pageWidth - elementWidth) 
        //     newLeft = pageWidth - elementWidth;

        // if (newTop < 0) newTop = 0;
        // else if (newTop > pageHeight - elementHeight) 
        //     newTop = pageHeight - elementHeight;
        
        element.style.setProperty("top", newTop + "px");
        element.style.setProperty("left", newLeft + "px");
    }

    const stopMoving = () => {
        page.removeEventListener("mousemove", moveElement);
        page.removeEventListener("mouseup", stopMoving);
    }

    element.addEventListener("mousedown", initializeMoving);
}