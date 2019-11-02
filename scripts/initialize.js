let photobook = new Photobook();
const page = photobook.element;

photobook.addPage();
photobook.addPage();
photobook.addPage(imageBase64);
photobook.getPage(3).backgroundImage = background4;
//possible background images: fabric(1-4) background(1-4)

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);