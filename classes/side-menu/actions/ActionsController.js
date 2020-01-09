class ActionsController extends EventEmitter {
  constructor () {
    super();
    this.fileController = new FileController();
    this.imagesController = new ImagesController();
    this.stickersController = new StickersController();
    this.textController = new TextController();
    this.backgroundController = new BackgroundController();
    this.init();
  }

    init = () => {
      this.eventsHandler();
      this.activateAction('file');
    }

    eventsHandler = () => {
      this.backgroundController.on('background', (background) => {
        this.emit('background', background);
      })

      this.fileController.on('file', (action) => {
        this.emit('file', action);
      });

      this.imagesController.on('imageClicked', (img) => {
        this.emit('imageClicked', img);
      });

      this.stickersController.on('stickerClicked', (sticker) => {
        this.emit('stickerClicked', sticker);
      });

      this.textController.on('textClicked', () => {
        this.emit('textClicked');
      });
    }

    selectAction = (actionName) => {
      this.disableAllActions();
      this.activateAction(actionName);
    }

    activateAction = (actionName) => {
      switch (actionName) {
        case 'file':
          this.fileController.activate();
          break;
        case 'images':
          this.imagesController.activate();
          break;
        case 'stickers':
          this.stickersController.activate();
          break;
        case 'text':
          this.textController.activate();
          break;
        case 'background':
          this.backgroundController.activate();
          break;
        default:
          console.log('o qurewaaa :======3');
      }
    }

    disableAllActions = () => {
      this.fileController.disable();
      this.imagesController.disable();
      this.stickersController.disable();
      this.textController.disable();
      this.backgroundController.disable();
    }
}
