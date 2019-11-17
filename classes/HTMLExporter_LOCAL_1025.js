class HTMLExporter {
    export(photobookElement) {
        let newDocument = document.createElement("html");
        
        newDocument.appendChild(_.clone(photobookElement, true));
        console.log(newDocument);
    }

    createHTMLTemplate() {
        const htmlTemplate = document.createElement("html");
        const head = document.createElement("head");
        const body = document.createElement("body");
    }

    createStyles() {
        const styles = document.createElement("style");
        styles.innerHTML = exportStyleTemplate; //this shoud be defined somewhere
    }
}