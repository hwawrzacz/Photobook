class Page {
  constructor(width, height, backgroundImage = '', images = [], textBoxes = []) {
    this.element = document.createElement('div');
    this.element.classList.add('page');
    this.element.classList.add('size-fill-parent');
    this.element.classList.add('page');
    this.width = width;
    this.height = height;

    this.images = images;
    this.textBoxes = textBoxes;
    this.backgroundImage = backgroundImage;

    this.visible = false;

    this.observeConfig = { childList: true, subtree: true };
    this.mutationObserver = new MutationObserver(this.deleteRemovedTextOrImageFromStorage);
    this.startPageObservation();
  }

  startPageObservation = () => {
    this.mutationObserver.observe(this.element, this.observeConfig);
  }

  deleteRemovedTextOrImageFromStorage = () => {
    this.images = this.images.filter((img) => {
      if (this.element.contains(img.element)) {
        return img;
      }
    });

    this.textBoxes = this.textBoxes.filter((text) => {
      if (this.element.contains(text.element)) {
        return text;
      }
    });
  }

  // #region Getters and setters
  set visible(value) {
    this.Visible = value;

    if (this.Visible == true) {
      this.element.style.setProperty("visibility", "visible");
    }
    else if (this.Visible == false) {
      this.element.style.setProperty("visibility", "hidden");
    }
  }

  get width() {
    return this.Width;
  }

  set width(value) {
    this.Width = value;
    this.element.style.setProperty('width', value);
  }

  get height() {
    return this.Height;
  }

  set height(value) {
    this.Height = value;
    this.element.style.setProperty('width', value);
  }

  get backgroundImage() {
    return this.BackgroundImage;
  }

  set backgroundImage(value) {
    this.BackgroundImage = value;
    this.element.style.setProperty('background-image', 'url(' + value + ')');
  }
  // #endregion

  addTextBox(top, left, bottom, width, height, rotation) {
    let newTextBox = new TextBox(top, left, bottom, width, height, rotation);
    this.textBoxes.push(newTextBox);
    this.element.appendChild(newTextBox.element);
  }

  addImage(base64Image) {
    const image = new Image();

    image.onload = () => {
      const initialWidth = image.width;
      const initialHeight = image.height;

      const imageSize = this.getMaxDimensions(initialWidth, initialHeight);
      const width = imageSize.width;
      const height = imageSize.height;

      let newImage = new PhotobookImage(base64Image, width, height);
      newImage.initializeHooksMechanism();
      this.images.push(newImage);
      this.element.appendChild(newImage.element);
    }

    image.src = base64Image;
  }

  getMaxDimensions(initialWidth, initialHeight) {
    const proportions = initialWidth / initialHeight;
    const widthCheck = this.width - initialWidth;
    const heightCheck = this.height - initialHeight;
    let width;
    let height;

    if (widthCheck < heightCheck) {
      width = this.width * 0.8;
      height = width / proportions;
    } else {
      height = this.height * 0.8;
      width = height * proportions;
    }

    return { 'width': width, 'height': height };
  }
}
