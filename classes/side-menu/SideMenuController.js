class SideMenuController extends EventEmitter {
  constructor () {
    super();
    this.actionsController = new ActionsController();
    this.menuController = new MenuController();
    this.init();
  }

    init = () => {
      this.eventHandler();
    }

    eventHandler = () => {
      this.actionsController.on('createFile', () => {
        this.emit('exportToPDF');
      });

      this.actionsController.on('imageClicked', (img) => {
        this.emit('createImage', img);
      });

      this.actionsController.on('stickerClicked', (sticker) => {
        this.emit('createSticker', sticker);
      });

      this.actionsController.on('textClicked', () => {
        this.emit('createText');
      });

      this.menuController.on('menuSelected', (status) => {
        this.actionsController.selectAction(status);
      });
    }
}