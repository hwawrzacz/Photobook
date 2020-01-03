class Hooks {
    constructor() {
        this.element = new DOMParser().parseFromString(this.hooksPattern, `text/html`);
    }

    hooksPattern = `
        <div class="hooks-container">
            <i class="hook hook-delete material-icons">close</i>
            <i class="hook hook-rotate material-icons">rotate_left</i>
            <i class="hook hook-resize material-icons">code</i>
            <i class= hook hook-level-up material icons>keyboard_arrow_up</i>
            <i class= hook hook-level-down material icons>keyboard_arrow_down</i>
        </div>`;
}