class Photobook {

    constructor() {
        this.pages = [];
        this.element = document.createElement("main");
        this.element.id = "view";
        document.querySelector("body").appendChild(this.element);
        console.log("Page: " + this.element.toString());
    }

    addPage() {
        let page = new Page([], [], (this.pages.length + 1));
        console.log(this.pages.length);
        this.pages.push(page);
        this.element.appendChild(page.element)
    }

    addTextBoxToPage(pageNumber){
        this.pages[pageNumber - 1].addTextBox(0, 0, "auto", 0);
    }

    addImageToPage(pageNumber){
        this.pages[pageNumber - 1].addImage(0, 0, "auto", 500, 300, 0);
    }

    getElement(){
        return this.element;
    }
    
}