class Hyperlink extends TextBox {
    constructor(top = 0, left = 0, width = 300, height = 50, rotation = 0) {
        super(top, left, width, height, rotation);
        const textBoxDocument = new DOMParser().parseFromString(this.textBoxPattern, "text/html");
        this.element = textBoxDocument.querySelector(".textbox-container");
        this.textBox = textBoxDocument.querySelector(".textbox");
        this.hyperlinkText = textBoxDocument.querySelector(".hyperlink-text");
        this.hyperlinkURL = textBoxDocument.querySelector(".hyperlink-url");

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
    get hyperlinkMode() {
        return this.HyperlinkMode;
    }

    set hyperlinkMode(value) {
        this.HyperlinkMode = value;
    }
    //#endregion

    toggleHyperlinkMode = () => {
        this.hyperlinkMode = !this.hyperlinkMode;
    }

    textBoxPattern = `
        <div class="textbox-container">
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
                <li><i class="toggle-hyperlink material-icons">check</i></li>
                <li><input class="text-color-picker" type="color" /></li>
                <li><input class="background-color-picker" type="color" /></li>
            </ul>

            <a class="proper-link" href=""></a>
            <input class="textbox" value="" type="text" />
            <input class="hyperlink-url" value="" type="text" />
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
                <i class="hook hook-resize material-icons">code</i>
            </div>
        </div>`;
}