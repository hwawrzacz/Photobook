class TextBox extends Element2D {
    constructor(width, height, zIndex) {
        super();
        const textBoxDocument = new DOMParser().parseFromString(this.textBoxPattern, `text/html`);
        this.element = textBoxDocument.querySelector(`.textbox-container`);
        this.textBox = textBoxDocument.querySelector(`.textbox`);
        this.urlText = textBoxDocument.querySelector(`.url-text`);
        this.urlTarget = textBoxDocument.querySelector(`.url-target`);

        //initialize hooks
        this.movementHooksManager = new MovementHooks(this);
        this.textManipulatingHooksManager = new TextManipulatingHooks(this);
        this.movementHooksManager.initializeHooksfunctionality();
        this.textManipulatingHooksManager.initializeHooksfunctionality();

        this.top = 0;
        this.left = 0;
        this.minWidth = 40;
        this.minHeight = 40;
        this.width = width || this.minWidth;
        this.height = height || this.minHeight;
        this.rotation = 0;
        this.zIndex = zIndex;

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
        this.backgroundColor = `white`;

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

        if (this.isUrlMode() || (this.currentMode === `url-edit-mode` && this.previousMode === `url-mode`)) {
            this.textManipulatingHooksManager.changeUrlIcon(`link_off`);
        }
        else {
            this.textManipulatingHooksManager.changeUrlIcon(`link`);
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
            this.currentMode = `url-edit-mode`;
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
            this.currentMode = `url-mode`;
            this.refreshUrlTarget();
        });

        hookDismissUrlMode.addEventListener(`click`, () => {
            this.enablePreviousMode();
        });
    }
    //#endregion

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
                    <i class="material-icons-round">close</i>
                </button>
                <button class="confirm-url-mode">
                    <p>Zatwierdź</p>
                    <i class="enable-url-mode material-icons-round">check</i>
                </button>
            </div>
        </div>`;
}