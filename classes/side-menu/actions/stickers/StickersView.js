class StickersView extends EventEmitter {
  constructor () {
    super();
    this.container = null;
    this.init();
  }

    init = () => {
      this.generateDOM();
    }

    generateDOM = () => {
      // TODO
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

export default StickersView;
