const manageTextBox = (button) => {

    const createTextBox = () => {
        const parser = new DOMParser();
        var textBoxDoc = parser.parseFromString(textBoxPattern, "text/html"); 
        const textBox = extractParsedTextbox(textBoxDoc);

        return textBox;
    }

    const addElement = () => {
        const textBox = createTextBox();
        const hookRotate = textBox.querySelector(".hook-rotate");
        const hookDelete = textBox.querySelector(".hook-delete");

        move(textBox);
        rotateElement(textBox, hookRotate);
        hookDelete.addEventListener("click", (e) => {
            textBox.remove();
        });

        page.appendChild(textBox);
    }


    button.addEventListener("click", addElement);
}

function extractParsedTextbox(document){
    return document.querySelector(".textbox-container");
}