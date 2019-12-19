class PhotobookImage extends Element2D {
    constructor(base64Image, width, height) {
        super();
        const imageDocument = new DOMParser().parseFromString(this.imagePattern, `text/html`);
        this.element = imageDocument.querySelector(`.image-container`);

        this.backgroundImage = base64Image;
        this.top = 0;
        this.left = 0;
        this.minWidth = 50;
        this.minHeight = 50;
        this.width = width;
        this.height = height;
        this.rotation = 0;

        this.initializeHooksMechanism();
    }

    get backgroundImage() {
        return this.BackgroundImage;
    }

    set backgroundImage(value) {
        this.BackgroundImage = value;
        this.element.style.setProperty(`background-image`, `url(` + value + `)`);
    }

    initializeHooksMechanism() {
        const hookResize = this.element.querySelector(`.hook-resize`);
        const hookRotate = this.element.querySelector(`.hook-rotate`);
        const hookDelete = this.element.querySelector(`.hook-delete`);

        move(this);
        resizeElement(this, hookResize);
        rotateElement(this, hookRotate);
        hookDelete.addEventListener(`click`, () => {
            this.element.remove();
            showInfo(`Element was removed`);
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