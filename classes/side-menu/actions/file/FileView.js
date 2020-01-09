class FileView extends EventEmitter {
  constructor() {
    super();
    this.container = null;
    this.init();
  }

  init = () => {
    this.generateDOM();
    this.addNewProjectButtonListener();
    this.addExportPdfButtonListener();
    this.addExportHtmlButtonListener();
    this.addPageButtonListener();
    this.deletePageButtonListener();
  }

  getStringElements = () => {
    const stringDOM = `<div class="action-file-container">
        <h3>Projekt</h3>
        <div class="option-container new-project">
          <div class="option-svg-container">
            <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <div class="option-text-container">
            <p>Nowy Projekt</p>
          </div>
        </div>
        <div class="option-container export-pdf">
          <div class="option-svg-container">
            <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>
          </div>
          <div class="option-text-container">
            <p>Exportuj do PDF</p>
          </div>
        </div>
        <div class="option-container export-html">
          <div class="option-svg-container">
            <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </div>
          <div class="option-text-container">
            <p>Exportuj do HTML</p>
          </div>
        </div>
        <div class="option-container add-page">
        <div class="option-svg-container">
        <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z"/></svg>
        </div>
        <div class="option-text-container">
          <p>Dodaj Strone</p>
        </div>
        </div>
        <div class="option-container delete-page">
          <div class="option-svg-container">
            <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
          </div>
          <div class="option-text-container">
            <p>Usuń Strone</p>
          </div>
        </div>
    </div>`;
    return stringDOM;
  }

  generateDOM = () => {
    const parser = new DOMParser();
    const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
    this.container = stringDOM.querySelector('.action-file-container');
  }

  addNewProjectButtonListener = () => {
    const newProjectButton = this.container.querySelector('.option-container.new-project');
    newProjectButton.addEventListener('click', this.newProjectClicked);
  }

  newProjectClicked = () => {
    this.emit('file', 'new');
  }

  addExportPdfButtonListener = () => {
    const button = this.container.querySelector('.option-container.export-pdf');
    button.addEventListener('click', this.exportPdfClicked);
  }

  exportPdfClicked = () => {
    this.emit('file', 'pdf');
  }

  addExportHtmlButtonListener = () => {
    const button = this.container.querySelector('.option-container.export-html');
    button.addEventListener('click', this.exportHtmlClicked);
  }

  exportHtmlClicked = () => {
    this.emit('file', 'html');
  }

  addPageButtonListener = () => {
    const button = this.container.querySelector('.option-container.add-page');
    button.addEventListener('click', this.addPageClicked);
  }

  addPageClicked = () => {
    this.emit('file', 'page');
  }

  deletePageButtonListener = () => {
    const button = this.container.querySelector('.option-container.delete-page');
    button.addEventListener('click', this.deletePageClicked);
  }

  deletePageClicked = () => {
    this.emit('file', 'delete');
  }

  activate = () => {
    actionsContainer.appendChild(this.container);
  }

  disable = () => {
    this.container.remove();
  }
}
