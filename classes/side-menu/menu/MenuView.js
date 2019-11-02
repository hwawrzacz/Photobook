class MenuView extends EventEmitter {
  constructor () {
    super();
    this.file = null;
    this.images = null;
    this.stickers = null;
    this.text = null;
    this.init();
  }

    init = () => {
      this.getMenuElementsFromDOM();
      this.appendListenersForElements();
    }

    getMenuElementsFromDOM = () => {
      this.file = document.querySelector('.menu .menu-file');
      this.images = document.querySelector('.menu .menu-images');
      this.stickers = document.querySelector('.menu .menu-stickers');
      this.text = document.querySelector('.menu .menu-text');
    }

    appendListenersForElements = () => {
      this.file.addEventListener('click', this.fileAction);
      this.images.addEventListener('click', this.imagesAction);
      this.stickers.addEventListener('click', this.stickersAction);
      this.text.addEventListener('click', this.textAction);
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
}

export default MenuView;
