class MovementHooks extends Hooks {
    constructor(parent) {
        super(parent);
        this.hooksDocument = new DOMParser().parseFromString(this.hooksPattern, `text/html`);
        this.element = this.hooksDocument.querySelector(`.hooks-container`);
        this.parent.element.appendChild(this.element);
    }

    initializeHooksfunctionality = () => {
        const hookResize = this.element.querySelector(`.hook-resize`);
        const hookRotate = this.element.querySelector(`.hook-rotate`);
        const hookDelete = this.element.querySelector(`.hook-delete`);
        const hookLevelUp = this.element.querySelector(`.hook-level-up`);
        const hookLevelDown = this.element.querySelector(`.hook-level-down`);

        move(this.parent);
        resizeElement(this.parent, hookResize);
        rotateElement(this.parent, hookRotate);

        hookDelete.addEventListener(`click`, () => {
            this.parent.element.remove();
            showInfo(`Element was removed`);
        });

        hookLevelUp.addEventListener(`click`, () => {
            this.parent.zIndex++;
        });

        hookLevelDown.addEventListener(`click`, () => {
            this.parent.zIndex--;
        });
    }

    hooksPattern = `
        <div class="hooks-container">
            <i class="hook hook-delete material-icons-round">close</i>
            <i class="hook hook-rotate material-icons-round">rotate_left</i>
            <i class="hook hook-resize material-icons-round">code</i>
            <i class="hook hook-level-up material-icons-round">keyboard_arrow_up</i>
            <i class="hook hook-level-down material-icons-round">keyboard_arrow_down</i>
        </div>`;
}