class ImagesController extends EventEmitter {
  constructor () {
    super();
    this.imagesView = new ImagesView();
    this.activated = false;
    this.init();
  }

  init = () => {
    this.eventsHandler();
  }

  eventsHandler = () => {
    this.imagesView.on('imageClicked', (img) => {
      this.emit('imageClicked', img);
    });
  }

    activate = () => {
      if (this.activated === false) {
        this.activated = true;
        this.imagesView.activate();
      }
    }

    disable = () => {
      if (this.activated === true) {
        this.activated = false;
        this.imagesView.disable();
      }
    }
}
export default ImagesController;
