class BackgroundView extends EventEmitter {
    constructor () {
      super();
      this.backgroundViewDOM = new BackgroundViewDOM();
      this.container = null;
      this.init();
    }
  
      init = () => {
        this.generateDOM();
        blobImages.forEach((blobImage) => {
          this.createBackgroundDOMAndAddItToContainer(blobImage);
        })
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
  