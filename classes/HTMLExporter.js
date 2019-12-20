class HTMLExporter {
    getPhotobookDocumentAsString(photobookElement) {
        let photobookDocument = this.createDocumentTemplate();

        photobookDocument = this.addStyles(photobookDocument);
        photobookDocument = this.addPhotobookElement(photobookElement, photobookDocument);
        photobookDocument = this.disableInputs(photobookDocument);

        const documentString = `
        <!DOCTYPE html>
        <html>
            <head>${photobookDocument.head.innerHTML}</head>
            <body>${photobookDocument.body.innerHTML}</body>
        </html>`;

        return documentString;
    }

    createDocumentTemplate() {
        const parser = new DOMParser();
        const documentTemplate = parser.parseFromString("", "text/html");

        return documentTemplate;
    }

    addStyles(photobookDocument) {
        const styles = document.createElement("style");

        // set charset
        photobookDocument.head.innerHTML = "<meta charset='utf-8' />";

        styles.innerHTML = this.styleTemplate; //this shoud be defined somewhere
        photobookDocument.head.appendChild(styles);

        return photobookDocument;
    }

    addPhotobookElement(photobookElement, photobookDocument) {
        photobookDocument.body.appendChild(photobookElement.cloneNode(true));

        return photobookDocument;
    }

    disableInputs(photobookDocument) {
        const inputs = photobookDocument.querySelectorAll("input");
        inputs.forEach(input => {
            input.setAttribute("disabled", "true");
        });

        return photobookDocument;
    }

    styleTemplate = `
    body{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}main#view{display:-webkit-box;display:-ms-flexbox;display:flex;width:100% !important;height:auto !important;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}div.page{position:relative;min-width:595px;min-height:842px;margin:20px;border:1px solid black;overflow:hidden;visibility:visible !important}div.page:first-child{margin:20px 100%}.image-container{position:absolute;background-position:center;background-size:100% 100%;cursor:default}.textbox-container{position:absolute}.textbox-container input[type=text]{position:relative;top:0;left:0;width:100%;height:100%;padding:10px;font-size:inherit;font-weight:inherit;font-style:inherit;text-decoration:inherit;text-align:inherit;border:none;outline:none}.textbox-tools,.hooks-container{display:none}`;
}