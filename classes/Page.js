class Page {
    constructor(backgroundImage = "", images = [], textBoxes = []) {
        this.images = images;
        this.textBoxes = textBoxes;

        this.element = document.createElement("div");
        this.element.classList.add("page");
        this.element.classList.add("size-fill-parent");
        this.element.classList.add("page");
        this.element.innerHTML = "Textbox" + (textBoxes.length + 1);
        this.element.innerHTML = "Page";
        this.element.style.setProperty("background-image", "url(" + backgroundImage +")");
     }

    addTextBox(top, left, bottom, width, height, rotation) {
        let newTextBox = new TextBox(top, left, bottom, width, height, rotation);
        this.element.appendChild(newTextBox.element);
        this.textBoxes.push(newTextBox);
    }

    addImage(base64Image) {
        let newImage = new Image(base64Image);
        newImage.initializeHooksMechanism();
        this.element.appendChild(newImage.element);
        this.images.push(newImage);
    }
    
    printTextBoxesNumber() {
        console.log(this.textBoxes.size);
    }
}