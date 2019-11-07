class ImagesViewDOM {
    generateElements = () => {
      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
      const container = stringDOM.querySelector('.action-images-container');
      return container;
    }

    getStringElements = () => {
      const stringElements = `
          <div class="action-images-container">
              <h3>Zdjęcia</h3>
              <label for="action-images-importer" class="action-import-images-button">
              <div class="action-images-svg-container">
                <svg class="action-images-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                </div>
              <div class="action-images-text-container">
                <p>Dodaj zdjecia</p>
              </div>
              </label>
              <input type="file" id="action-images-importer" class="action-images-importer" name="action-images-importer" multiple>
              <div class="action-images"></div>
          </div>
          `;

      return stringElements;
    }

    createImageDOM = (imageBASE) => {
      const image = this.createImage(imageBASE);
      const imageContainer = this.createImageContainer();
      imageContainer.appendChild(image);
      return imageContainer;
    }

    createImage = (imageBASE) => {
      const image = document.createElement('img');
      image.setAttribute('alt', 'image');
      image.setAttribute('src', imageBASE);
      // image.style.width = '100px';
      // image.style.height = '200px';
      return image;
    }

    createImageContainer = () => {
      const container = document.createElement('div');
      container.classList.add('action-image-container');
      const destroyContainerButton = this.createDestropContainerButton();
      container.appendChild(destroyContainerButton);
      return container;
    }

    createDestropContainerButton = () => {
      const stringWithDomElements = `
      <div class="action-image-container-delete">
        <svg class="action-image-container-delete-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      </div>
      `;

      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(stringWithDomElements, 'text/html');
      const container = stringDOM.querySelector('.action-image-container-delete');
      return container;
    }
}
