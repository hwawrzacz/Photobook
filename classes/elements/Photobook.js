class Photobook extends EventEmitter {
  constructor(width, height) {
    super();
    this.name = "Nowy projekt";
    this.pages = [];
    this.element = document.createElement('main');
    this.element.id = 'view';
    this.width = width;
    this.height = height;
    this.addPage();

    this.activePageIndex = 0;
    this.activePage = this.pages[this.activePageIndex];
    this.activePage.visible = true;
    document.querySelector('.core').appendChild(this.element);
  }

  //#region Getters and setters
  get name() {
    return this.Name;
  }

  set name(value) {
    this.Name = value !== `` ? value : `Nowy projekt`;
  }

  get width() {
    return this.Width
  }

  set width(value) {
    this.Width = value;
    this.element.style.setProperty('width', value + 'px');
  }

  get height() {
    return this.Height;
  }

  set height(value) {
    this.Height = value;
    this.element.style.setProperty('height', value + 'px');
  }
  // #endregion

  showPreviousPage() {
    if (this.activePageIndex > 0) {
      this.activePageIndex--; // activePageIndex is saint, and cannot be touched
      this.showActivePage();
    }
  }

  showNextPage() {
    if (this.activePageIndex < this.pages.length - 1) {
      this.activePageIndex++;
      this.showActivePage();
    }
  }

  showActivePage() {
    this.activePage.visible = false;
    this.activePage = this.pages[this.activePageIndex];
    this.activePage.visible = true;
  }

  addPage(backgroundImage) {
    let page = new Page(this.width, this.height, backgroundImage);
    this.pages.push(page);
    this.element.appendChild(page.element);
    this.emit('changed');
  }

  getPage(pageNumber) {
    if (pageNumber > 0 && pageNumber < this.pages.length - 1) {
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

  changeActivePageBackground(base64Image) {
    this.activePage.backgroundImage = base64Image;
  }

  deleteActivePage() {
    if (this.pages.length > 1) {
      const formerActivePageIndex = this.activePageIndex;

      this.activePage.element.remove();

      const pagesBeforeActive = this.pages.slice(0, formerActivePageIndex)
      const pagesAfterActive = this.pages.slice(formerActivePageIndex + 1, this.pages.length)
      this.pages = pagesBeforeActive.concat(pagesAfterActive);

      if (this.isActivePageLastPage()) {
        this.showPreviousPage();
      }
      else {
        this.showActivePage();
      }
    }
  }

  isActivePageLastPage() {
    return this.activePageIndex === this.pages.length;
  }

  isActivePageFirstPage() {
    return this.activePageIndex === 0;
  }

  exportToHTML() {
    this.disableTextboxesUrlEditMode();
    const exporter = new HTMLExporter();
    const documentString = exporter.getPhotobookDocumentAsString(this.element);
    const url = URL.createObjectURL(new Blob([documentString], { type: `text/html` }));
    download(url, `${this.name}.html`);
  }

  disableTextboxesUrlEditMode() {
    this.pages.forEach(page => {
      if (page.urlMode) {
        page.currentMode = `url-mode`;
      }
      else {
        page.currentMode = `textbox-mode`;
      }
    });
  }

  exportToPDF() {
    const exporter = new PDFExporter();
    exporter.exportToPDF(this);
  }
}
