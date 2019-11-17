class TextBox extends Element2D {
    constructor(top = 0, left = 0, width = 300, height = 50, rotation = 0) {
        super();
        const textBoxDocument = new DOMParser().parseFromString(this.textBoxPattern,"text/html");
        this.element = textBoxDocument.querySelector(".textbox-container");
        this.textBox = textBoxDocument.querySelector(".textbox");
        
        this.top = top;
        this.left = left;
        this.minWidth = 300;
        this.minHeight = 50;
        this.width = width;
        this.height = height;
        this.rotation = rotation;

        this.value = "";
        this.textAlign = "left";
        this.fontSize = 14;
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.textColor = "black";
        this.backgroundColor = "transparent";
        
        this.initializeMovementHooksMechanism();
        this.initializeContentEditHooksMechanism();
    }

    //#region Getters and setters
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

    get bold() {
        return this.Bold;
    }

    set bold(value) {
        this.Bold = value;
        if (this.Bold) this.element.style.setProperty("font-weight", "bold");
        else  this.element.style.setProperty("font-weight", "normal");
    }

    get italic() {
        return this.Italic;
    }

    set italic(value) {
        this.Italic = value;
        if (this.Italic) this.element.style.setProperty("font-style", "italic");
        else  this.element.style.setProperty("font-style", "normal");
    }
    
    get underline() {
        return this.Underline;
    }
    
    set underline(value) {
        this.Underline = value;
        if (this.Underline) this.element.style.setProperty("text-decoration", "underline");
        else  this.element.style.setProperty("text-decoration", "none");
    }
    
    get textColor() {
        return this.TextColor;
    }
    
    set textColor(value) {
        this.TextColor = value;
        this.textBox.style.setProperty("color", value);
    }
    
    get backgroundColor() {
        return this.BackgroundColor;
    }
    
    set backgroundColor(value) {
        this.BackgroundColor = value;
        this.textBox.style.setProperty("background-color", value);
    }

    get value() {
        return this.BackgroundColor;
    }
    
    set value(value) {
        this.Value = value;
        this.textBox.value = value;
        
        //TODO: check compatibility of setAttribute
        //may cause problems in the future
        this.textBox.setAttribute("value", value);
    }
    //#endregion
    
    //#region Hooks mechanisms
    initializeMovementHooksMechanism() {
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

    initializeContentEditHooksMechanism() {
        const hookBold = this.element.querySelector(".bold");
        const hookItalic = this.element.querySelector(".italic");
        const hookUnderline = this.element.querySelector(".underline");
        const hookFontUp = this.element.querySelector(".font-up");
        const hookFontDown = this.element.querySelector(".font-down");
        const hookTextAlignLeft = this.element.querySelector(".hook-text-align-left");
        const hookTextAlignCenter = this.element.querySelector(".hook-text-align-center");
        const hookTextAlignRight = this.element.querySelector(".hook-text-align-right");

        const textColorPicker = this.element.querySelector(".text-color-picker");
        const backgroundColorPicker = this.element.querySelector(".background-color-picker");
        const hookTextColor = this.element.querySelector(".text-color");
        const hookBackgroundColor = this.element.querySelector(".background-color");

        backgroundColorPicker.addEventListener("change", (event) => {
            const color = event.target.value; 
            this.backgroundColor = color;
            hookBackgroundColor.style.setProperty("color", color);
        });

        textColorPicker.addEventListener("change", (event) => {
            const color = event.target.value; 
            this.textColor = color;
            hookTextColor.style.setProperty("color", color);
        });

        hookTextColor.addEventListener("click", () => {
            textColorPicker.click();
        });

        hookBackgroundColor.addEventListener("click", () => {
            backgroundColorPicker.click();
        });

        hookBold.addEventListener("click", this.toggleBold);
        hookItalic.addEventListener("click", this.toggleItalic);
        hookUnderline.addEventListener("click", this.toggleUnderline);

        hookFontUp.addEventListener("mousedown", () => {
            this.fontSize += 2;
        });

        hookFontUp.addEventListener("mousedown", () => {
            this.fontSize += 2;
        });

        hookFontDown.addEventListener("click", () => {
            this.fontSize -= 2;
        });

        hookTextAlignLeft.addEventListener("click", () => {
            this.textAlign = "left";
        });
        
        hookTextAlignCenter.addEventListener("click", () => {
            this.textAlign = "center";
        });
        
        hookTextAlignRight.addEventListener("click", () => {
            this.textAlign = "right";
        });        

        this.textBox.addEventListener("keyup", () => {
            this.value = this.textBox.value;
        });
    }
    //#endregion

    toggleBold = () => {
        this.bold = !this.bold;
    }

    toggleItalic = () => {
        this.italic = !this.italic;
    }

    toggleUnderline = () => {
        this.underline = !this.underline;
    }

    textBoxPattern = `
        <div class="textbox-container">
            <input class="textbox" type="text" />

            <ul class="textbox-tools size-fill-parent">
                <li><i class="material-icons hook-text-align-left">format_align_left</i></li>
                <li><i class="material-icons hook-text-align-center">format_align_justify</i></li>
                <li><i class="material-icons hook-text-align-right">format_align_right</i></li>
                <li><i class="font-down material-icons">text_rotation_angledown</i></li>
                <li><i class="font-up material-icons">text_rotation_angleup</i></li>
                <li><i class="bold material-icons">format_bold</i></li>
                <li><i class="italic material-icons">format_italic</i></li>
                <li><i class="underline material-icons">format_underline</i></li>
                <li><i class="text-color material-icons">text_format</i></li>
                <li><i class="background-color material-icons">color_lens</i></li>
                <li><input class="text-color-picker" type="color" /></li>
                <li><input class="background-color-picker" type="color" /></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
                <i class="hook hook-resize material-icons">code</i>
            </div>
        </div>`;
}