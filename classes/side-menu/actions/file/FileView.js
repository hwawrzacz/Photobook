class FileView extends EventEmitter {
  constructor () {
    super();
    this.container = null;
    this.init();
  }

  init = () => {
    this.generateDOM();
    this.addFileButtonListener();
  }

  getStringElements = () => {
    const stringDOM = `<div class="action-file-container">
        <h3>Projekt</h3>
        <div class="action-file-create-button"></div>
    </div>`;
    return stringDOM;
  }

  generateDOM = () => {
    const parser = new DOMParser();
    const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
    this.container = stringDOM.querySelector('.action-file-container');
  }

  addFileButtonListener = () => {
    const fileButton = this.container.querySelector('.action-file-create-button');
    fileButton.addEventListener('click', this.fileButtonClicked);
  }

  fileButtonClicked = () => {
    this.emit('createFile');
  }

    activate = () => {
      actionsContainer.appendChild(this.container);
    }

    disable = () => {
      this.container.remove();
    }
}
