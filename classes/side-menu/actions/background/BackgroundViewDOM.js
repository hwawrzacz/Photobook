class BackgroundViewDOM {
    generateElements = () => {
      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
      const container = stringDOM.querySelector('.action-background-container');
      return container;
    }

    getStringElements = () => {
      const stringElements = `
          <div class="action-background-container">
              <h3>Tło</h3>
              <div class="action-background"></div>
          </div>
          `;

      return stringElements;
    }

    createBackgroundDOM = (imageBASE) => {
      const image = this.createBackground(imageBASE);
      const imageContainer = this.createBackgroundContainer();
      imageContainer.appendChild(image);
      return imageContainer;
    }

    createBackground = (imageBASE) => {
      const image = document.createElement('img');
      image.setAttribute('alt', 'image');
      image.setAttribute('src', imageBASE);
      // image.style.width = '100px';
      // image.style.height = '200px';
      return image;
    }

    createBackgroundContainer = () => {
      const container = document.createElement('div');
      container.classList.add('action-background-container');
      return container;
    }
}
