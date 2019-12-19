class Photobook {
  constructor(width, height) {
    this.pages = [];
    this.element = document.createElement('main');
    this.element.id = 'view';
    this.width = width;
    this.height = height;
    document.querySelector('.core').appendChild(this.element);
  }

  //#region Getters and setters
  get width() {
    return this.Width
  }

  set width(value) {
    this.Width = value;
    this.element.style.setProperty("width", value + "px");
  }

  get height() {
    return this.Height
  }

  set height(value) {
    this.Height = value;
    this.element.style.setProperty("height", value + "px");
  }
  //#endregion

  addPage(backgroundImage) {
    let page = new Page(this.width, this.height, backgroundImage, [], []);
    this.pages.push(page);
    this.element.appendChild(page.element);
    this.activePage = page;
  }

  getPage(pageNumber) {
    if (pageNumber > 0) {
      return this.pages[pageNumber - 1];
    }
  }

  addTextBoxToPage(pageNumber) {
    this.pages[pageNumber - 1].addTextBox(0, 0);
  }

  addTextBoxToActivePage() {
    this.activePage.addTextBox(0, 0);
  }

  addImageToPage(base64Image, pageNumber) {
    this.pages[pageNumber - 1].addImage(base64Image);
  }

  addImageToActivePage(base64Image) {
    this.activePage.addImage(base64Image);
  }

  exportToJSON() {
    const jsonPhotobook = JSON.stringify(this);
    console.log(this);
  }

  exportToHTML() {
    const exporter = new HTMLExporter();
    exporter.exportToHTML(this.element);
    let newDocument = document.createElement("html");

    newDocument.appendChild(this.element.cloneNode(true));

    const url = URL.createObjectURL(newDocument)
    download(url)
    console.log("Html donwload shoud happened");
  }

  exportToPDF() {
    const exporter = new PDFExporter();
    exporter.exportToPDF(this);
  }
}
