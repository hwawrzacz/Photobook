class TextBox extends Element2D {
    constructor(top = 0, left = 0, width = 300, height = 50, rotation = 0) {
        super();
        const textBoxDocument = new DOMParser().parseFromString(this.textBoxPattern,"text/html");
        this.element = textBoxDocument.querySelector(".textbox-container");
        
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.rotation = rotation;

        this.textAlign = "left";
        this.fontSize = 14;
        
        this.initializeHooksMechanism();
    }

    //region Getters and setters
    get textAlign() {
        return this.TextAlignment;
    }

    set textAlign(value) {
        this.TextAlign = value;
        this.element.style.setProperty("text-align", value);
    }

    get fontSize() {
        return this.FontSize;
    }

    set fontSize(value) {
        if (value > 0) {   
            this.FontSize = value;
            this.element.style.setProperty("font-size", value + "px");
        }
    }
    //endregion

    initializeHooksMechanism() {
        const hookResize = this.element.querySelector(".hook-resize");
        const hookRotate = this.element.querySelector(".hook-rotate");
        const hookDelete = this.element.querySelector(".hook-delete");
        
        const hookFontUp = this.element.querySelector(".font-up");
        const hookFontDown = this.element.querySelector(".font-down");
        const hookTextAlignLeft = this.element.querySelector(".hook-text-align-left");
        const hookTextAlignCenter = this.element.querySelector(".hook-text-align-center");
        const hookTextAlignRight = this.element.querySelector(".hook-text-align-right");

        hookTextAlignLeft.addEventListener("click", () => {
            console.log("align left");
            this.textAlign = "left";
        });
        
        hookTextAlignCenter.addEventListener("click", () => {
            console.log("align center");
            this.textAlign = "center";
        });
        
        hookTextAlignRight.addEventListener("click", () => {
            this.textAlign = "right";
        });

        hookFontUp.addEventListener("mousedown", () => {
            this.fontSize += 2;
        });

        hookFontDown.addEventListener("click", () => {
            this.fontSize -= 2;
        });

        move(this);
        resizeElement(this, hookResize);
        rotateElement(this, hookRotate);
        hookDelete.addEventListener("click", () => {
            this.element.remove();
            showInfo("Element was removed");
        });
    }

    textBoxPattern = `
        <div class="textbox-container">
            <input type="text" />

            <ul class="textbox-tools size-fill-parent">
                <li><i class="material-icons hook-text-align-left">format_align_left</i></li>
                <li><i class="material-icons hook-text-align-center">format_align_justify</i></li>
                <li><i class="material-icons hook-text-align-right">format_align_right</i></li>
                <li><i class="font-down material-icons">text_rotation_angledown</i></li>
                <li><i class="font-up material-icons">text_rotation_angleup</i></li>
                <li><input type="color" /></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
                <i class="hook hook-resize material-icons">code</i>
            </div>
        </div>`;
}