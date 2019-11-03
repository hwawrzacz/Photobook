class FileController extends EventEmitter {
  constructor () {
    super();
    this.fileView = new FileView();
    this.activated = false;
    this.init();
  }

  init = () => {
    this.eventsHandler();
  }

  eventsHandler = () => {
    this.fileView.on('createFile', () => {
      this.emit('createFile');
    });
  }

  activate = () => {
    if (this.activated === false) {
      this.activated = true;
      this.fileView.activate();
    }
  }

  disable = () => {
    if (this.activated === true) {
      this.activated = false;
      this.fileView.disable();
    }
  }
}
