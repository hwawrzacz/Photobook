class Page {
    //number is just for helping with identifying specific page
    constructor(images, textBoxes, number) {
        this.images = images;
        this.textBoxes = textBoxes;

        this.element = document.createElement("div");
        this.element.classList.add("page");
        this.element.classList.add("size-fill-parent");
        this.element.classList.add("page");
        this.element.innerHTML = "Textbox" + (textBoxes.length + 1);
        this.element.innerHTML = "Page" + number;
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