class TextBox extends Element2D {
    constructor(top = 0, left = 0, width = 300, height = 50, rotation = 0) {
        super();
        const parser = new DOMParser().parseFromString(this.textBoxPattern,"text/html");
        this.element = parser.querySelector(".textbox-container");
        
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
        hookDelete.addEventListener("click", (e) => {
            this.element.remove();
            showInfo("Element was removed");
        });
    }

    initializeAppearanceModifiers() {

    }

    textBoxPattern = `
        <div class="textbox-container">
            <input type="text" />

            <ul class="textbox-tools size-fill-parent">
                <li><i class="material-icons hook-text-align-center">format_align_left</i></li>
                <li><i class="material-icons hook-text-align-justify">format_align_justify</i></li>
                <li><i class="material-icons hook-text-align-right">format_align_right</i></li>
                <li><i class="material-icons ">text_rotation_angleup</i></li>
                <li><i class="material-icons ">text_rotation_angledown</i></li>
                <li><input type="color" /></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
                <i class="hook hook-resize material-icons">code</i>
            </div>
        </div>`;
}