class FileView extends EventEmitter {
  constructor () {
    super();
    this.container = null;
    this.init();
  }

  init = () => {
    this.generateDOM();
    this.addNewProjectButtonListener();
    this.addExportPdfButtonListener();
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
            <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </div>
          <div class="option-text-container">
            <p>Exportuj do PDF</p>
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

    activate = () => {
      actionsContainer.appendChild(this.container);
    }

    disable = () => {
      this.container.remove();
    }
}
