class MenuView extends EventEmitter {
  constructor () {
    super();
    this.file = null;
    this.images = null;
    this.stickers = null;
    this.text = null;
    this.background = null;
    this.init();
  }

    init = () => {
      this.getMenuElementsFromDOM();
      this.appendListenersForElements();
      this.activeMenuOptionByName('file');
    }

    getMenuElementsFromDOM = () => {
      this.file = document.querySelector('.menu .menu-file');
      this.images = document.querySelector('.menu .menu-images');
      this.stickers = document.querySelector('.menu .menu-stickers');
      this.text = document.querySelector('.menu .menu-text');
      this.background = document.querySelector('.menu .menu-background');
    }

    appendListenersForElements = () => {
      this.file.addEventListener('click', this.fileAction);
      this.images.addEventListener('click', this.imagesAction);
      this.stickers.addEventListener('click', this.stickersAction);
      this.text.addEventListener('click', this.textAction);
      this.background.addEventListener('click', this.backgroundAction);
    }

    backgroundAction = () => {
      this.eventHandler('background');
    }

    fileAction = () => {
      this.eventHandler('file');
    }

    imagesAction = () => {
      this.eventHandler('images');
    }

    stickersAction = () => {
      this.eventHandler('stickers');
    }

    textAction = () => {
      this.eventHandler('text');
    }

    eventHandler = (actionName) => {
      this.emit('menuSelected', actionName);
    }

    switchActiveButton = (name) => {
      this.disableAllMenuOptions();
      this.activeMenuOptionByName(name);
    } 

    activeMenuOptionByName = (name) => {
      switch(name){
        case 'background':
          this.appendSelectStyleForElement(this.background);
          break;
        case 'file' :
          this.appendSelectStyleForElement(this.file);
          break;
        case 'images' :
              this.appendSelectStyleForElement(this.images);
              break;
        case 'stickers' :
          this.appendSelectStyleForElement(this.stickers);
          break;
        case 'text' :
          this.appendSelectStyleForElement(this.text);
          break;
        default: 
        console.log('o quuuwaa 8===3')
      }
    }

    appendSelectStyleForElement = (element) => {
      if(!element.classList.contains('active')){
        element.classList.add('active');
      }
    }

    disableAllMenuOptions = () => {
      this.file.classList.remove('active');
      this.images.classList.remove('active');
      this.stickers.classList.remove('active');
      this.text.classList.remove('active');
      this.background.classList.remove('active');
    }
}