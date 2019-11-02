class Image extends Element2D {

    constructor(base64Image, top = 0, left = 0, width = 500, height = 300, rotation = 0) {
        super();
        const imageDocument = new DOMParser().parseFromString(this.imagePattern,"text/html");
        this.element = imageDocument.querySelector(".image-container");
        this.element.style.setProperty("background-image", "url(" + base64Image +")");
        
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.rotation = rotation;

        this.initializeHooksMechanism();
    }
    
    initializeHooksMechanism() {
        const hookResize = this.element.querySelector(".hook-resize");
        const hookRotate = this.element.querySelector(".hook-rotate");
        const hookDelete = this.element.querySelector(".hook-delete");

        move(this);
        resizeElement(this, hookResize);
        rotateElement(this, hookRotate);
        hookDelete.addEventListener("click", () => {
            this.element.remove();
            showInfo("Element was removed");
        });
    }
    
    imagePattern = `
        <div class="image-container flex-container flex-v-h-center">
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-resize material-icons">code</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
            </div>
        </div>`;
}