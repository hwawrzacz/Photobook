class StickersView extends EventEmitter {
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
        <div class="action-stickers-container">
          <div class="action-sticker">STICKER</div>
        </div>`;
        return stringDOM;
    }

    generateDOM = () => {
      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(this.getStringDOM(), 'text/html');
      const container = stringDOM.querySelector('.action-stickers-container');
      this.container = container;
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
