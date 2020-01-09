dimensions = getMaxDimensions();

const projectNameInput = document.querySelector(`#project-name`);
const photobook = new Photobook(dimensions.width, dimensions.height);
const page = photobook.element;

const nav = new Nav(photobook);

const buttonMenuToggle = document.querySelector('#button-menu-toggle');

const toggleMenu = () => {
  console.log('clicked');
  const buttonMenuToggleIcon = buttonMenuToggle.querySelector('i');
  const menu = document.querySelector('.side-menu');
  const content = document.querySelector(`.content`);

  content.classList.toggle(`padding-left`);
  buttonMenuToggle.classList.toggle('rotate');
  buttonMenuToggleIcon.innerHTML = toggleIcon(buttonMenuToggleIcon.innerHTML);
  menu.classList.toggle('visible');
};

buttonMenuToggle.addEventListener('click', toggleMenu);

projectNameInput.addEventListener(`change`, () => {
  if (projectNameInput.value === ``) {
    projectNameInput.value = `Nowy projekt`;
  }

  photobook.name = projectNameInput.value;
  console.log(photobook);
});

const toggleIcon = (value) => {
  let result;

  if (value == 'keyboard_arrow_up') {
    result = 'menu';
  } else result = 'keyboard_arrow_up';

  return result;
};

// START Kamil
const sideMenuController = new SideMenuController();

sideMenuController.on('file', (action) => {
  switch (action) {
    case 'new': {
      console.log('New project');
      photobook.exportToJSON();
      break;
    }

    case 'pdf': {
      console.log('PDF');
      photobook.exportToPDF();
      break;
    }

    case 'html': {
      console.log('HTML');
      photobook.exportToHTML();
      break;
    }

    case 'page': {
      console.log('PAGE');
      photobook.addPage();
      break;
    }

    default: {
      console.log('Unknown command');
    }
  }
});

sideMenuController.on('createImage', (imgBase64) => {
  // User Want To Add Image To Active Page
  photobook.addImageToActivePage(imgBase64);
});

sideMenuController.on('createSticker', (stickerBase64) => {
  // User Want To Add Sticker To Active Page
  photobook.addImageToActivePage(stickerBase64);
});

sideMenuController.on('createText', () => {
  // User Want To Add Text To Active Page
  photobook.addTextBoxToActivePage();
});

sideMenuController.on('background', (background) => {
  console.log(background);
});
// END Kamil

photobook.addImageToActivePage(imageBase64);
photobook.addTextBoxToActivePage();

// #region Functions definitions
function getMaxDimensions () {
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
// #endregion
