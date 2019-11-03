class Page {
    constructor(backgroundImage = "", images = [], textBoxes = []) {
        this.images = images;
        this.textBoxes = textBoxes;

        this.element = document.createElement("div");
        this.element.classList.add("page");
        this.element.classList.add("size-fill-parent");
        this.element.classList.add("page");
        this.backgroundImage = backgroundImage;
    }

    //#region Getters and setters
    get backgroundImage() {
        return this.BackgroundImage;
    } 

    set backgroundImage(value) {
        this.BackgroundImage = value;
        this.element.style.setProperty("background-image", "url(" + value +")");
    }
    //#endregion

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
}