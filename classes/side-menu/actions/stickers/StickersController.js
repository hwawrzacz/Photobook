class StickersController extends EventEmitter {
  constructor () {
    super();
    this.stickersView = new StickersView();
    this.activated = false;
    this.init();
  }

  init = () => {
    this.eventsHandler();
  }

  eventsHandler = () => {
    this.stickersView.on('stickerClicked', (sticker) => {
      this.emit('stickerClicked', sticker);
    });
  }

    activate = () => {
      if (this.activated === false) {
        this.activated = true;
        this.stickersView.activate();
      }
    }

    disable = () => {
      if (this.activated === true) {
        this.activated = false;
        this.stickersView.disable();
      }
    }
}
