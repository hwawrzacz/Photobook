let photobook = new Photobook();
const page = photobook.element;

const button = document.querySelector("#getDataButton");

photobook.addPage();
photobook.addPage();
photobook.addPage(imageBase64);
photobook.getPage(3).backgroundImage = "";
//possible background images: fabric(1-4) background(1-4)

photobook.addImageToPage(imageBase64, 3);
photobook.addTextBoxToPage(3);

button.addEventListener("click", () => {
    photobook.exportToHTML()
});