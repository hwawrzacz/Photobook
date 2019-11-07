const photobook = new Photobook();
const page = photobook.element;

// START Kamil
const sideMenuController = new SideMenuController();

sideMenuController.on('file', (action) => {
  console.log(action);
});

sideMenuController.on('createImage', (imgBase64) => {
  // User Want To Add Image To Active Page
  console.log(imgBase64);
});

sideMenuController.on('createSticker', (stickerBase64) => {
  // User Want To Add Sticker To Active Page
  console.log(stickerBase64);
});

sideMenuController.on('createText', () => {
// User Want To Add Text To Active Page
  console.log('User Want To Add Text To Active Page');
});

// END Kamil

photobook.addPage();
photobook.addPage();
photobook.addPage(imageBase64);
photobook.getPage(3).backgroundImage = '';
// possible background images: fabric(1-4) background(1-4)

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

console.log(JSON.stringify(photobook));
