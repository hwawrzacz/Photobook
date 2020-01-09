class BackgroundView extends EventEmitter {
    constructor () {
      super();
      this.backgroundViewDOM = new BackgroundViewDOM();
      this.container = null;
      this.init();
    }
  
      init = () => {
        this.generateDOM();
        this.createBackgroundDOMAndAddItToContainer('./images/fabric-1-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/fabric-2-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/fabric-3-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/fabric-4-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/background-1-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/background-2-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/background-3-min.jpg');
        this.createBackgroundDOMAndAddItToContainer('./images/background-4-min.jpg');
      }
  
      generateDOM = () => {
        const container = this.backgroundViewDOM.generateElements();
        container.querySelector('h3').innerHTML = 'Tło';
        this.container = container;
      }
  
      createBackgroundDOMAndAddItToContainer = (myImg) => {
        const background = this.backgroundViewDOM.createBackgroundDOM(myImg);
        const backgroundContainer = this.container.querySelector('.action-background');
        backgroundContainer.addEventListener('click', this.userClickedOnBackground);
        backgroundContainer.appendChild(background);
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
  