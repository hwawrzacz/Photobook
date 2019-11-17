const photobook = new Photobook();
const page = photobook.element;

// START Kamil
const sideMenuController = new SideMenuController();

sideMenuController.on('file', (action) => {
  //pdf - export
  //new - new project
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
// possible background images: fabric(1-4) background(1-4)

photobook.addImageToActivePage(imageBase64);
photobook.addTextBoxToActivePage();
