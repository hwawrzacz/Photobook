class MenuController extends EventEmitter {
  constructor () {
    super();
    this.menuView = new MenuView();
    this.init();
  }

    init = () => {
      this.eventHandler();
    }

    eventHandler = () => {
      this.menuView.on('menuSelected', (action) => {
        this.emit('menuSelected', action);
        this.menuView.switchActiveButton(action);
      });
    }
}
