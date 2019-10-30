let photobook = new Photobook();
const page = photobook.element;

photobook.addPage(1);
photobook.addPage(2);
photobook.addPage(3);

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);