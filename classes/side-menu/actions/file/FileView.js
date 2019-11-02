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
    const stringDOM = `<div class="file-container">
        <div class="file-create-button"></div>
    </div>`;
    return stringDOM;
  }

  generateDOM = () => {
    const parser = new DOMParser();
    const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
    this.container = stringDOM.querySelector('.file-container');
  }

  addFileButtonListener = () => {
    const fileButton = this.container.querySelector('.file-create-button');
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

export default FileView;
