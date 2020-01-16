class StickersView extends EventEmitter {
  constructor() {
    super();
    this.stickersViewDOM = new StickersViewDOM();
    this.container = null;
    this.init();
  }

  init = () => {
    this.generateDOM();
    blobStickers.forEach((blobSticker) => {
      this.createStickerDOMAndAddItToContainer(blobSticker);
    })
  }

  generateDOM = () => {
    const container = this.stickersViewDOM.generateElements();
    container.querySelector('h3').innerHTML = 'Naklejki';
    this.container = container;
  }

  createStickerDOMAndAddItToContainer = (myImg) => {
    const sticker = this.stickersViewDOM.createStickersDOM(myImg);
    const stickerContainer = this.container.querySelector('.action-stickers');
    stickerContainer.addEventListener('click', this.userClickedOnSticker);
    stickerContainer.appendChild(sticker);
  }

  userClickedOnSticker = (e) => {
    this.emit('stickerClicked', e.target.src);
  }

  activate = () => {
    actionsContainer.appendChild(this.container);
  }

  disable = () => {
    this.container.remove();
  }
}
