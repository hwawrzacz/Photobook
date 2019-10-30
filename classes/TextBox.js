class TextBox {
    constructor(top = 0, left = 0, bottom = "auto", rotation = 0) {
        const parser = new DOMParser().parseFromString(this.textBoxPattern,"text/html");
        this.element = parser.querySelector(".textbox-container");
        this.initializeHooksMechanism();
    }
    
    initializeHooksMechanism() {
        const hookRotate = this.element.querySelector(".hook-rotate");
        const hookDelete = this.element.querySelector(".hook-delete");

        move(this.element);
        rotateElement(this.element, hookRotate);
        hookDelete.addEventListener("click", (e) => {
            this.element.remove();
        });
    }

    textBoxPattern = `
        <div class="textbox-container">
            <input type="text" />

            <ul class="textbox-tools size-fill-parent">
                <li><i class="material-icons">format_align_left</i></li>
                <li><i class="material-icons">format_align_justify</i></li>
                <li><i class="material-icons">format_align_right</i></li>
                <li><i class="material-icons">text_rotation_angleup</i></li>
                <li><i class="material-icons">text_rotation_angledown</i></li>
                <li><input type="color" /></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
            </div>
        </div>`;
}