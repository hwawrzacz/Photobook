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
        this.activePage = page;
    }

    getPage(pageNumber) {
        if (pageNumber > 0)
            return this.pages[pageNumber - 1];
    }

    addTextBoxToPage(pageNumber){
        this.pages[pageNumber - 1].addTextBox(0, 0);
    }

    addTextBoxToActivePage(){
        this.activePage.addTextBox(0, 0);
    }

    addImageToPage(base64Image, pageNumber){
        this.pages[pageNumber - 1].addImage(base64Image);
    }
    addImageToActivePage(base64Image){
        this.activePage.addImage(base64Image);
    }    
}