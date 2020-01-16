//move
const move = (target) => {
    const page = document.querySelector(`main`);
    let startingTop;
    let startingLeft;

    const initializeMoving = (event) => {
        getStartingMouseCoordinates(event);
        startingTop = target.top;
        startingLeft = target.left;

        page.addEventListener("mousemove", moveElement);
        page.addEventListener("mouseup", stopMoving);
    }

    const moveElement = (event) => {
        getMouseCoordinates(event);
        let newLeft = mouseX - mouseX0 + startingLeft;
        let newTop = mouseY - mouseY0 + startingTop;

        target.top = newTop;
        target.left = newLeft;
    }

    const stopMoving = () => {
        page.removeEventListener("mousemove", moveElement);
        page.removeEventListener("mouseup", stopMoving);
    }

    target.element.addEventListener("mousedown", initializeMoving);
}