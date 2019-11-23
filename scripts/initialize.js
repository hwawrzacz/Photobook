dimensions = getDimensions();

const photobook = new Photobook(dimensions.width, dimensions.height);
const page = photobook.element;

// START Kamil
const sideMenuController = new SideMenuController();

sideMenuController.on('file', (action) => {
  switch (action) {
    case "new": {
      console.log("New project");
      photobook.exportToJSON();
      break;
    }

    case "pdf": {
      console.log("PDF");
      photobook.exportToJSON();
      break;
    }

    case "html": {
      console.log("HTML");
      photobook.exportToHTML();
      break;
    }

    default: {
      console.log("Unknown command");
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

//#region Functions definitions
function getDimensions() {
  const proportions = 595 / 842;
  const maxHeight = document.querySelector('.content').offsetHeight;
  const maxWidth = document.querySelector('.content').offsetWidth;
  const widthControl = maxWidth - 595;
  const heightControl = maxHeight - 842;
  let width;
  let height;

  if (widthControl < heightControl) {
    width = maxWidth * 0.9;
    height = width / proportions;
  }
  else {
    height = maxHeight * 0.9;
    width = height * proportions;
  }

  return { "width": width, "height": height }
}
//#endregion