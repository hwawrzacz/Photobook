class Image {
    constructor(base64Image) {
        const parser = new DOMParser().parseFromString(this.imagePattern,"text/html");
        this.element = parser.querySelector(".image-container");
        this.element.style.setProperty("background-image", "url(" + base64Image +")");
        this.element.classList.add("DUPA");
        this.initializeHooksMechanism();
    }
    
    initializeHooksMechanism() {
        const hookResize = this.element.querySelector(".hook-resize");
        const hookRotate = this.element.querySelector(".hook-rotate");
        const hookDelete = this.element.querySelector(".hook-delete");

        move(this.element);
        resizeElement(this.element, hookResize);
        rotateElement(this.element, hookRotate);
        hookDelete.addEventListener("click", (e) => {
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