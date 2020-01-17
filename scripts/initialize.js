// #region Functions definitions
const initializePhotobook = () => {
  photobook = new Photobook(dimensions.width, dimensions.height);
  const page = photobook.element;

  const nav = new Nav(photobook);

  projectNameInput.addEventListener(`change`, () => {
    if (projectNameInput.value === ``) {
      projectNameInput.value = `Nowy projekt`;
    }

    photobook.name = projectNameInput.value;
    console.log(photobook);
  });

  // START Kamil
  const sideMenuController = new SideMenuController();

  sideMenuController.on('file', (action) => {
    switch (action) {
      case 'new': {
        showNewProjectDialog();
        break;
      }

      case 'pdf': {
        photobook.exportToPPTX();
        break;
      }

      case 'html': {
        photobook.exportToHTML();
        break;
      }

      case 'page': {
        photobook.addPage();
        break;
      }

      case 'delete': {
        photobook.deleteActivePage();
        nav.disableOrActivateButton();
        break;
      }

      default: {
        console.log('Unknown command');
      }
    }
  });

  sideMenuController.on('createImage', (imgBase64) => {
    photobook.addImageToActivePage(imgBase64);
  });

  sideMenuController.on('createSticker', (stickerBase64) => {
    photobook.addImageToActivePage(stickerBase64);
  });

  sideMenuController.on('createText', () => {
    photobook.addTextBoxToActivePage();
  });

  sideMenuController.on('background', (background) => {
    photobook.changeActivePageBackground(background);
  });
  // END Kamil
};

function getMaxDimensions() {
  const proportions = 595 / 842;
  const headerHeight = document.querySelector('header').offsetHeight;
  const maxHeight = document.querySelector('.content').offsetHeight - headerHeight;
  const maxWidth = document.querySelector('.content').offsetWidth;
  const widthCheck = maxWidth - 595;
  const heightCheck = maxHeight - 842;
  let width;
  let height;

  if (widthCheck < heightCheck) {
    width = maxWidth * 0.9;
    height = width / proportions;
  } else {
    height = maxHeight * 0.9;
    width = height * proportions;
  }

  return { 'width': width, 'height': height };
}

function showNewProjectDialog() {
  const prompt = new NewProjectDialog();
  const container = document.querySelector(`div.container`);
  container.appendChild(prompt.element);
}
// #endregion

dimensions = getMaxDimensions();
const projectNameInput = document.querySelector(`#project-name`);
let photobook;
initializePhotobook();
