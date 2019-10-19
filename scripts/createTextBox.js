const addTextBox = (button) => {

    const createTextBox = () => {
        var textBox = document.createElement("input");
        textBox.setAttribute("type", "text");

        return textBox;
    }

    const setDefaultCssAttributes = (textBox) => {
        textBox.style.setProperty("position", "relative");
        textBox.style.setProperty("width", "200px");
        textBox.style.setProperty("height", "40px");

        return textBox;
    } 

    const addElement = () => {
        console.log("textbox added")
        var textBox = createTextBox();
        textBox = setDefaultCssAttributes(textBox);
        page.appendChild(textBox);
    }

    button.addEventListener("click", addElement);
}