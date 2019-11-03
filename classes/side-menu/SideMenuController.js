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

      this.menuController.on('menuSelected', (status) => {
        this.actionsController.selectAction(status);
      });
    }
}