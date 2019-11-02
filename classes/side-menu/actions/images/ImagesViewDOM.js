class ImagesViewDOM {
    generateElements = () => {
      const parser = new DOMParser();
      const stringDOM = parser.parseFromString(this.getStringElements(), 'text/html');
      const container = stringDOM.querySelector('.images-container');
      return container;
    }

    getStringElements = () => {
      const stringElements = `
          <div class="images-container">
              <label for="images-importer" class="import-images-button">Zaimportuj Obrazy</label>
              <input type="file" id="images-importer" class="images-importer" name="images-importer" multiple>
              <div class="images"></div>
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
      image.style.width = '100px';
      image.style.height = '200px';
      return image;
    }

    createImageContainer = () => {
      const container = document.createElement('div');
      container.classList.add('image-container');
      const destroyContainerButton = document.createElement('div');
      destroyContainerButton.classList.add('image-container-delete');
      container.appendChild(destroyContainerButton);
      return container;
    }
}

export default ImagesViewDOM;
