class Photobook {

    constructor() {
        this.pages = [];
        this.element = document.createElement("main");
        this.element.id = "view";
        document.querySelector("body").appendChild(this.element);
    }

    addPage() {
        let page = new Page([], [], (this.pages.length + 1));
        this.pages.push(page);
        this.element.appendChild(page.element)
    }

    addTextBoxToPage(pageNumber){
        this.pages[pageNumber - 1].addTextBox(0, 0, "auto", 0);
    }

    addImageToPage(base64Image, pageNumber){
        this.pages[pageNumber - 1].addImage(base64Image);
    }

    getElement(){
        return this.element;
    }
    
}