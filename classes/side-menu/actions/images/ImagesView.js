class ImagesView extends EventEmitter {
  constructor() {
    super();
    this.imagesViewDOM = new ImagesViewDOM();
    this.container = null;
    this.init();
  }

  init = () => {
    this.generateDOM();
    this.addInputFileListener();
  }

  generateDOM = () => {
    const container = this.imagesViewDOM.generateElements();
    container.querySelector('h3').innerHTML = 'Zdjęcia';
    this.container = container;
  }

  addInputFileListener = () => {
    const input = this.container.querySelector('.action-images-importer');
    input.addEventListener('change', this.createImages);
  }

  createImages = () => {
    const input = this.container.querySelector('.action-images-importer');
    Array.from(input.files).forEach(file => {
      const render = new FileReader();
      render.addEventListener('load', this.createImageDOMAndAddItToContainer);
      render.readAsDataURL(file);
    });
  }

  createImageDOMAndAddItToContainer = (e) => {
    const image = this.imagesViewDOM.createImageDOM(e.target.result);
    const imagesContainer = this.container.querySelector('.action-images');
    const imagesContainerDestroyButton = image.querySelector('.action-image-container-delete');
    imagesContainer.addEventListener('click', this.userClickedOnImage);
    imagesContainerDestroyButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      imagesContainer.removeChild(image);
    });
    imagesContainer.appendChild(image);
  }

  userClickedOnImage = (e) => {
    this.emit('imageClicked', e.target.src);
  }

  activate = () => {
    actionsContainer.appendChild(this.container);
  }

  disable = () => {
    this.container.remove();
  }
}
