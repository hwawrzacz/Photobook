class PhotobookImage extends Element2D {
    constructor(base64Image, width, height) {
        super();
        const imageDocument = new DOMParser().parseFromString(this.imagePattern, `text/html`);
        this.element = imageDocument.querySelector(`.image-container`);

        this.zIndex = 0;
        this.backgroundImage = base64Image;
        this.top = 0;
        this.left = 0;
        this.minWidth = 40;
        this.minHeight = 40;
        this.width = width || this.minWidth;
        this.height = height || this.minHeight;
        this.rotation = 0;

        this.initializeMovementHooks();
    }

    get backgroundImage() {
        return this.BackgroundImage;
    }

    set backgroundImage(value) {
        this.BackgroundImage = value;
        this.element.style.setProperty(`background-image`, `url(` + value + `)`);
    }

    initializeMovementHooks = () => {
        const hookResize = this.element.querySelector(`.hook-resize`);
        const hookRotate = this.element.querySelector(`.hook-rotate`);
        const hookDelete = this.element.querySelector(`.hook-delete`);
        const hookLevelUp = this.element.querySelector(`.hook-level-up`);
        const hookLevelDown = this.element.querySelector(`.hook-level-down`);

        move(this);
        resizeElement(this, hookResize);
        rotateElement(this, hookRotate);

        hookDelete.addEventListener(`click`, () => {
            this.element.remove();
            showInfo(`Element was removed`);
        });

        hookLevelUp.addEventListener(`click`, () => {
            this.zIndex++;
        });

        hookLevelDown.addEventListener(`click`, () => {
            this.zIndex--;
        });
    }

    imagePattern = `
        <div class="image-container flex-container flex-v-h-center">
            <div class="hooks-container">
                <i class="hook hook-delete material-icons-round">close</i>
                <i class="hook hook-rotate material-icons-round">rotate_left</i>
                <i class="hook hook-resize material-icons-round">code</i>
                <i class="hook hook-level-up material-icons-round">keyboard_arrow_up</i>
                <i class="hook hook-level-down material-icons-round">keyboard_arrow_down</i>
            </div>
        </div>`;
}