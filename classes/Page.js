class Page {
    constructor(width, height, backgroundImage = "", images = [], textBoxes = []) {
        this.element = document.createElement("div");
        this.element.classList.add("page");
        this.element.classList.add("size-fill-parent");
        this.element.classList.add("page");
        this.width = width;
        this.height = height;

        this.images = images;
        this.textBoxes = textBoxes;
        this.backgroundImage = backgroundImage;
    }

    get width() {
        return this.Width;
    }

    set width(value) {
        this.Width = value;
        this.element.style.setProperty("width", value);
    }

    get height() {
        return this.Height
    }

    set height(value) {
        this.Height = value;
        this.element.style.setProperty("width", value);
    }

    //#region Getters and setters
    get backgroundImage() {
        return this.BackgroundImage;
    }

    set backgroundImage(value) {
        this.BackgroundImage = value;
        this.element.style.setProperty("background-image", "url(" + value + ")");
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