class StickersViewDOM {
    generateElements = () => {
      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
      const container = stringDOM.querySelector('.action-stickers-container');
      return container;
    }

    getStringElements = () => {
      const stringElements = `
          <div class="action-stickers-container">
              <h3>Naklejki</h3>
              <div class="action-stickers"></div>
          </div>
          `;

      return stringElements;
    }

    createStickersDOM = (imageBASE) => {
      const image = this.createSticker(imageBASE);
      const imageContainer = this.createStickerContainer();
      imageContainer.appendChild(image);
      return imageContainer;
    }

    createSticker = (imageBASE) => {
      const image = document.createElement('img');
      image.setAttribute('alt', 'image');
      image.setAttribute('src', imageBASE);
      return image;
    }

    createStickerContainer = () => {
      const container = document.createElement('div');
      container.classList.add('action-sticker-container');
      return container;
    }
}
