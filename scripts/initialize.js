dimensions = getDimensions();

const buttonMenuToggle = document.querySelector("#button-menu-toggle");
const buttonMenuToggleIcon = buttonMenuToggle.querySelector("i");
const menu = document.querySelector(".side-menu");

const toggleMenu = (event) => {
  console.log("clicked");
  buttonMenuToggle.classList.toggle("rotate");
  buttonMenuToggleIcon.innerHTML = toggleIcon(buttonMenuToggleIcon.innerHTML)
  menu.classList.toggle("visible");
}

const toggleIcon = (value) => {
  let result;

  if (value == "keyboard_arrow_up") {
    result = "menu";
  }
  else result = "keyboard_arrow_up"

  return result;
}

buttonMenuToggle.addEventListener("click", toggleMenu);


const photobook = new Photobook(dimensions.width, dimensions.height);
setInterval(() => { console.log(photobook); }, 5000);

const page = photobook.element;

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
// END Kamil

photobook.addPage(fabric3);
// possible background images: fabric(1-4), background(1-4)

photobook.addImageToActivePage(imageBase64);
photobook.addTextBoxToActivePage();

// #region Functions definitions
function getDimensions () {
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
