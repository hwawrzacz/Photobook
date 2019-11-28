class Page {
  constructor (width, height, backgroundImage = '', images = [], textBoxes = []) {
    this.element = document.createElement('div');
    this.element.classList.add('page');
    this.element.classList.add('size-fill-parent');
    this.element.classList.add('page');
    this.width = width;
    this.height = height;

    this.images = images;
    this.textBoxes = textBoxes;
    this.backgroundImage = backgroundImage;

    this.observeConfig = { childList: true, subtree: true };
    this.mutationObserver = new MutationObserver(this.deleteRemovedTextOrImageFromStorage);
    this.startPageObservation();
  }

  startPageObservation = () => {
      this.mutationObserver.observe(this.element, this.observeConfig);
  }

  deleteRemovedTextOrImageFromStorage = () => {
    this.images = this.images.filter((img) => {
        if(this.element.contains(img.element)){
            return img;
        }
    });
    
    this.textBoxes = this.textBoxes.filter((text) => {
        if(this.element.contains(text.element)){
            return text;
        }
    });
  }

  get width () {
    return this.Width;
  }

  set width (value) {
    this.Width = value;
    this.element.style.setProperty('width', value);
  }

  get height () {
    return this.Height;
  }

  set height (value) {
    this.Height = value;
    this.element.style.setProperty('width', value);
  }

  // #region Getters and setters
  get backgroundImage () {
    return this.BackgroundImage;
  }

  set backgroundImage (value) {
    this.BackgroundImage = value;
    this.element.style.setProperty('background-image', 'url(' + value + ')');
  }
  // #endregion

  addTextBox (top, left, bottom, width, height, rotation) {
    let newTextBox = new TextBox(top, left, bottom, width, height, rotation);
    this.textBoxes.push(newTextBox);
    this.element.appendChild(newTextBox.element);
  }

  addImage (base64Image) {
    let newImage = new Image(base64Image);
    newImage.initializeHooksMechanism();
    this.images.push(newImage);
    this.element.appendChild(newImage.element);
  }
}
