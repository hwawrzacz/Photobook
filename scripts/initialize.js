const photobook = new Photobook();
const page = photobook.element;

const sideMenuController = new SideMenuController();

photobook.addPage(1);
photobook.addPage(2);
photobook.addPage(3);

console.log(photobook.activePage);

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

console.log(photobook.activePage);
