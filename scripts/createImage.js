const manageImage = (button) => {

    const createImage = () => {
        const parser = new DOMParser();
        const imageDoc = parser.parseFromString(imagePattern, "text/html"); 
        const image = extractParsedImage(imageDoc);

        return image;
    }

    const addElement = () => {
        const image = createImage();
        const hookRotate = image.querySelector(".hook-rotate");
        const hookDelete = image.querySelector(".hook-delete");

        move(image);
        rotateElement(image, hookRotate);
        hookDelete.addEventListener("click", (e) => {
            image.remove();
        });

        page.appendChild(image);
    }

    button.addEventListener("click", addElement);
}

function extractParsedImage(document){
    return document.querySelector(".image-container");
}