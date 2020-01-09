class BackgroundController extends EventEmitter {
    constructor () {
      super();
      this.backgroundView = new BackgroundView();
      this.activated = false;
      this.init();
    }
  
    init = () => {
      this.eventsHandler();
    }
  
    eventsHandler = () => {
      this.backgroundView.on('background', (img) => {
        this.emit('background', img);
      });
    }
  
      activate = () => {
        if (this.activated === false) {
          this.activated = true;
          this.backgroundView.activate();
        }
      }
  
      disable = () => {
        if (this.activated === true) {
          this.activated = false;
          this.backgroundView.disable();
        }
      }
  }