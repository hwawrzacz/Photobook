class TextBox {
    constructor() {
        const parser = new DOMParser().parseFromString(textBoxPattern,"text/html");
        this.textBox = parser.querySelector(".textbox-container"); 
    }
}