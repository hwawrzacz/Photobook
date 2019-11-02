let photobook = new Photobook();
const page = photobook.element;

photobook.addPage();
photobook.addPage();
photobook.addPage(fabric1Base64);

console.log(photobook.activePage);

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

console.log(photobook.activePage)