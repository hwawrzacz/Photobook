class TextBox extends Element2D {
    constructor(width, height) {
        super();
        const textBoxDocument = new DOMParser().parseFromString(this.textBoxPattern, `text/html`);
        this.element = textBoxDocument.querySelector(`.textbox-container`);
        this.textBox = textBoxDocument.querySelector(`.textbox`);
        this.urlText = textBoxDocument.querySelector(`.url-text`);
        this.urlTarget = textBoxDocument.querySelector(`.url-target`);

        this.top = 0;
        this.left = 0;

        this.minWidth = 40;
        this.minHeight = 40;
        this.width = width || this.minWidth;
        this.height = height || this.minHeight;
        this.rotation = 0;

        this.previousMode = ``;
        this.currentMode = `textbox-mode`;
        this.urlMode = false;
        this.text = ``;
        this.textAlign = `left`;
        this.fontSize = 14;
        this.bold = false;
        this.italic = false;
        this.underline = false;
        this.textColor = `#000`;
        this.backgroundColor = `transparent`;

        this.initializeMovementHooks();
        this.initializeContentEditHooks();
        this.initializeUrlHooks();
    }

    //#region Getters and setters
    get textAlign() {
        return this.TextAlignment;
    }

    set textAlign(value) {
        this.TextAlign = value;
        this.element.style.setProperty(`text-align`, value);
    }

    get fontSize() {
        return this.FontSize;
    }

    set fontSize(value) {
        if (value > 0 && value <= this.height - 20) {
            this.FontSize = value;
            this.element.style.setProperty(`font-size`, this.FontSize + `px`);
        }
    }

    get bold() {
        return this.Bold;
    }

    set bold(value) {
        this.Bold = value;
        if (this.Bold) this.element.style.setProperty(`font-weight`, `bold`);
        else this.element.style.setProperty(`font-weight`, `normal`);
    }

    get italic() {
        return this.Italic;
    }

    set italic(value) {
        this.Italic = value;
        if (this.Italic) this.element.style.setProperty(`font-style`, `italic`);
        else this.element.style.setProperty(`font-style`, `normal`);
    }

    get underline() {
        return this.Underline;
    }

    set underline(value) {
        this.Underline = value;
        if (this.Underline) this.element.style.setProperty(`text-decoration`, `underline`);
        else this.element.style.setProperty(`text-decoration`, `none`);
    }

    get textColor() {
        return this.TextColor;
    }

    set textColor(value) {
        this.TextColor = value;
        this.element.style.setProperty(`color`, value);
    }

    get backgroundColor() {
        return this.BackgroundColor;
    }

    set backgroundColor(value) {
        this.BackgroundColor = value;
        this.element.style.setProperty(`background-color`, value);
    }

    get currentMode() {
        return this.CurrentMode;
    }

    set currentMode(value) {
        this.previousMode = this.currentMode;
        this.CurrentMode = value;
        this.element.classList.remove(this.previousMode);
        this.element.classList.add(this.currentMode);

        if (this.isTextboxMode()) {
            this.urlMode = false;
        }

        if (this.isUrlMode()) {
            this.urlMode = true;
        }

        if (this.currentMode === `url-mode` || (this.currentMode === `url-edit-mode` && this.previousMode === `url-mode`)) {
            this.changeUrlIcon(`link_off`);
        }
        else {
            this.changeUrlIcon('link');
        }
    }

    get previousMode() {
        return this.PreviousMode;
    }

    set previousMode(value) {
        this.PreviousMode = value;
    }

    get text() {
        return this.Text;
    }

    set text(value) {
        this.Text = value;
        this.textBox.value = this.text;

        //TODO: check compatibility of setAttribute
        //may cause problems in the future
        this.textBox.setAttribute(`value`, this.text);
    }
    //#endregion

    //#region Hooks mechanisms
    initializeMovementHooks = () => {
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

    initializeUrlHooks = () => {
        const hookToggleURL = this.element.querySelector(`.hook-toggle-url`);
        const hookConfirmUrlMode = this.element.querySelector(`.url-actions .confirm-url-mode`);
        const hookDismissUrlMode = this.element.querySelector(`.url-actions .dismiss-url-mode`);

        //prevent copy-move-paste action
        this.urlText.addEventListener(`mousedown`, (e) => {
            e.preventDefault();
        });

        this.urlText.addEventListener(`click`, (e) => {
            //prevent opening a link
            e.preventDefault();
            this.currentMode = 'url-edit-mode';
        });

        hookToggleURL.addEventListener(`click`, () => {
            if (this.isUrlMode()) {
                this.currentMode = `textbox-mode`;
            }
            else if (!this.isUrlEditMode()) {
                this.currentMode = `url-edit-mode`;
            }
        });

        hookConfirmUrlMode.addEventListener(`click`, () => {
            this.currentMode = 'url-mode';
            this.refreshUrlTarget();
        });

        hookDismissUrlMode.addEventListener(`click`, () => {
            this.enablePreviousMode();
        });

    }

    initializeContentEditHooks = () => {
        const hookBold = this.element.querySelector(`.bold`);
        const hookItalic = this.element.querySelector(`.italic`);
        const hookUnderline = this.element.querySelector(`.underline`);
        const hookFontUp = this.element.querySelector(`.font-up`);
        const hookFontDown = this.element.querySelector(`.font-down`);
        const hookTextAlignLeft = this.element.querySelector(`.hook-text-align-left`);
        const hookTextAlignCenter = this.element.querySelector(`.hook-text-align-center`);
        const hookTextAlignRight = this.element.querySelector(`.hook-text-align-right`);

        const textColorPicker = this.element.querySelector(`.text-color-picker`);
        const backgroundColorPicker = this.element.querySelector(`.background-color-picker`);
        const hookTextColor = this.element.querySelector(`.text-color`);
        const hookBackgroundColor = this.element.querySelector(`.background-color`);

        backgroundColorPicker.addEventListener(`change`, (event) => {
            const color = event.target.value;
            this.backgroundColor = color;
            hookBackgroundColor.style.setProperty(`color`, color);
        });

        textColorPicker.addEventListener(`change`, (event) => {
            const color = event.target.value;
            this.textColor = color;
            hookTextColor.style.setProperty(`color`, color);
        });

        hookTextColor.addEventListener(`click`, () => {
            textColorPicker.click();
        });

        hookBackgroundColor.addEventListener(`click`, () => {
            backgroundColorPicker.click();
        });

        hookBold.addEventListener(`click`, this.toggleBold);
        hookItalic.addEventListener(`click`, this.toggleItalic);
        hookUnderline.addEventListener(`click`, this.toggleUnderline);

        hookFontUp.addEventListener(`mousedown`, () => {
            this.fontSize += 2;
        });

        hookFontDown.addEventListener(`click`, () => {
            this.fontSize -= 2;
        });

        hookTextAlignLeft.addEventListener(`click`, () => {
            this.textAlign = `left`;
        });

        hookTextAlignCenter.addEventListener(`click`, () => {
            this.textAlign = `center`;
        });

        hookTextAlignRight.addEventListener(`click`, () => {
            this.textAlign = `right`;
        });

        this.textBox.addEventListener(`keyup`, () => {
            this.text = this.textBox.value;
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

    enablePreviousMode = () => {
        const tmp = this.currentMode;
        this.currentMode = this.previousMode;
        this.previousMode = tmp;
    }

    isTextboxMode = () => {
        return this.currentMode === `textbox-mode`;
    }

    isUrlEditMode = () => {
        return this.currentMode === `url-edit-mode`;
    }

    isUrlMode = () => {
        return this.currentMode === `url-mode`;
    }

    changeUrlIcon = (value) => {
        const urlIcon = this.element.querySelector(`.hook-toggle-url`);
        urlIcon.innerHTML = value;
    }

    refreshUrlTarget = () => {
        const urlTarget = this.urlTarget.value;
        this.urlText.setAttribute(`href`, urlTarget);
        this.urlText.innerHTML = this.text;
    }

    textBoxPattern = `
        <div class="textbox-container textbox-mode">
            <a href="#" target="_blank" class="url-text"></a>
            <input class="textbox" value="asd" type="text" />
            <input class="url-target" placeholder="np. http://google.com" value="" type="text" />

            <div class="url-actions">
                <button class="dismiss-url-mode">
                    <p>Anuluj</p>
                    <i class="material-icons">close</i>
                </button>
                <button class="confirm-url-mode">
                    <p>Zatwierdź</p>
                    <i class="enable-url-mode material-icons">check</i>
                </button>
            </div>

            <ul class="textbox-tools size-fill-parent">
                <li><i class="hook-text-align-left material-icons">format_align_left</i></li>
                <li><i class="hook-text-align-center material-icons">format_align_justify</i></li>
                <li><i class="hook-text-align-right material-icons">format_align_right</i></li>
                <li><i class="font-down material-icons">text_rotation_angledown</i></li>
                <li><i class="font-up material-icons">text_rotation_angleup</i></li>
                <li><i class="bold material-icons">format_bold</i></li>
                <li><i class="italic material-icons">format_italic</i></li>
                <li><i class="underline material-icons">format_underline</i></li>
                <li><i class="text-color material-icons">text_format</i></li>
                <li><i class="background-color material-icons">color_lens</i></li>
                <li><input class="text-color-picker" type="color" /></li>
                <li><input class="background-color-picker" type="color" /></li>
                <li><i class="hook-toggle-url material-icons">link</i></li>
            </ul>
            
            <div class="hooks-container">
                <i class="hook hook-delete material-icons">close</i>
                <i class="hook hook-rotate material-icons">rotate_left</i>
                <i class="hook hook-resize material-icons">code</i>
            </div>
        </div>`;
}