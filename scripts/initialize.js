const photobook = new Photobook();
const page = photobook.element;

console.log(photobook);

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

photobook.addPage(1);
photobook.addPage(2);
photobook.addPage(3);

console.log(photobook.activePage);

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

console.log(photobook.activePage);
