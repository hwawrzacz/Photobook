class TextController extends EventEmitter {
    constructor () {
      super();
      this.textView = new TextView();
      this.activated = false;
      this.init();
    }
  
        init = () => {
          this.eventsHandler();
        }
  
        eventsHandler = () => {
          this.textView.on('textClicked', () => {
            this.emit('textClicked');
          });
        }
  
          activate = () => {
            if (this.activated === false) {
              this.activated = true;
              this.textView.activate();
            }
          }
  
          disable = () => {
            if (this.activated === true) {
              this.activated = false;
              this.textView.disable();
            }
          }
  }
  