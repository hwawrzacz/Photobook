const photobook = new Photobook();
const page = photobook.element;

// START Kamil
const sideMenuController = new SideMenuController();

sideMenuController.on('exportToPDF', () => {
  // User Want To Generate PDF
  console.log('User Want PDF');
});

sideMenuController.on('createImage', (img) => {
  // User Want To Add Image To Active Page
  console.log(img);
});

// END Kamil

photobook.addPage(1);
photobook.addPage(2);
photobook.addPage(3);

console.log(photobook.activePage);

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

console.log(photobook.activePage);
