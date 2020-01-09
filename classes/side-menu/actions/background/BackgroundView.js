class BackgroundView extends EventEmitter {
    constructor () {
      super();
      this.backgroundViewDOM = new BackgroundViewDOM();
      this.container = null;
      this.init();
    }
  
      init = () => {
        this.generateDOM();
      }
  
      generateDOM = () => {
        const container = this.backgroundViewDOM.generateElements();
        container.querySelector('h3').innerHTML = 'Tło';
        this.container = container;
      }
  
      createBackgroundDOMAndAddItToContainer = (e) => {
        const background = this.backgroundViewDOM.createBackgroundDOM(e.target.result);
        const backgroundContainer = this.container.querySelector('.action-background');
        backgroundContainer.addEventListener('click', this.userClickedOnBackground);
        backgroundContainer.appendChild(image);
      }
  
      userClickedOnBackground = (e) => {
        this.emit('background', e.target.src);
      }
  
      activate = () => {
        actionsContainer.appendChild(this.container);
      }
  
      disable = () => {
        this.container.remove();
      }
  }
  