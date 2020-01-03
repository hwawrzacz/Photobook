class TextManipulatingHooks {
    constructor(parent) {
        this.hooksDocument = new DOMParser().parseFromString(this.hooksPattern, `text/html`);
        this.element = this.hooksDocument.querySelector(`.textbox-tools`);
        this.parent = parent;
        this.parent.element.appendChild(this.element);
    }

    initializeHooksfunctionality = () => {
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
            this.parent.backgroundColor = color;
            hookBackgroundColor.style.setProperty(`color`, color);
        });

        textColorPicker.addEventListener(`change`, (event) => {
            const color = event.target.value;
            this.parent.textColor = color;
            hookTextColor.style.setProperty(`color`, color);
        });

        hookTextColor.addEventListener(`click`, () => {
            textColorPicker.click();
        });

        hookBackgroundColor.addEventListener(`click`, () => {
            backgroundColorPicker.click();
        });

        hookBold.addEventListener(`click`, this.parent.toggleBold);
        hookItalic.addEventListener(`click`, this.parent.toggleItalic);
        hookUnderline.addEventListener(`click`, this.parent.toggleUnderline);

        hookFontUp.addEventListener(`mousedown`, () => {
            this.parent.fontSize += 2;
        });

        hookFontDown.addEventListener(`click`, () => {
            this.parent.fontSize -= 2;
        });

        hookTextAlignLeft.addEventListener(`click`, () => {
            this.parent.textAlign = `left`;
        });

        hookTextAlignCenter.addEventListener(`click`, () => {
            this.parent.textAlign = `center`;
        });

        hookTextAlignRight.addEventListener(`click`, () => {
            this.parent.textAlign = `right`;
        });

        this.parent.textBox.addEventListener(`keyup`, () => {
            this.parent.text = this.parent.textBox.value;
        });
    }

    toggleBold = () => {
        this.parent.bold = !this.parent.bold;
    }

    toggleItalic = () => {
        this.parent.italic = !this.parent.italic;
    }

    toggleUnderline = () => {
        this.parent.underline = !this.parent.underline;
    }

    changeUrlIcon = (value) => {
        const urlIcon = this.element.querySelector(`.hook-toggle-url`);
        urlIcon.innerHTML = value;
    }

    hooksPattern = `
        <ul class="textbox-tools size-fill-parent">
            <li><i class="hook-text-align-left material-icons-round">format_align_left</i></li>
            <li><i class="hook-text-align-center material-icons-round">format_align_justify</i></li>
            <li><i class="hook-text-align-right material-icons-round">format_align_right</i></li>
            <li><i class="font-down material-icons-round">text_rotation_angledown</i></li>
            <li><i class="font-up material-icons-round">text_rotation_angleup</i></li>
            <li><i class="bold material-icons-round">format_bold</i></li>
            <li><i class="italic material-icons-round">format_italic</i></li>
            <li><i class="underline material-icons-round">format_underlined</i></li>
            <li><i class="text-color material-icons-round">text_format</i></li>
            <li><i class="background-color material-icons-round">color_lens</i></li>
            <li><input class="text-color-picker" type="color" /></li>
            <li><input class="background-color-picker" type="color" /></li>
            <li><i class="hook-toggle-url material-icons-round">link</i></li>
        </ul>`;
}