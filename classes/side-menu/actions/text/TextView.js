class TextView extends EventEmitter {
    constructor () {
      super();
      this.container = null;
      this.init();
    }
  
          init = () => {
            this.generateDOM();
          }
  
          getStringDOM = () => {
            const stringDOM = `
              <div class="action-text-container">
                <div class="action-text">Text</div>
              </div>`;
            return stringDOM;
          }
  
          generateDOM = () => {
            const parser = new DOMParser();
            const stringDOM = parser.parseFromString(this.getStringDOM(), 'text/html');
            const container = stringDOM.querySelector('.action-text-container');
            this.container = container;
          }
  
          userClickedOnText = (e) => {
            this.emit('textClicked', e.target.src);
          }
  
          activate = () => {
            actionsContainer.appendChild(this.container);
          }
  
          disable = () => {
            this.container.remove();
          }
  }
  