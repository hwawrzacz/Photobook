class Hooks {
    constructor(parent) {
        this.parent = parent;
        this.initializeHooksShowingFunction();
    }

    showHooks = () => {
        this.element.classList.add(`visible`);
    }

    hideHooks = () => {
        this.element.classList.remove(`visible`);
    }

    initializeHooksShowingFunction = () => {
        this.parent.element.addEventListener(`mouseenter`, () => {
            console.log(`mouseenter`);
            this.showHooks();
        });

        this.parent.element.addEventListener(`mouseleave`, () => {
            console.log(`mouseleave`);
            this.hideHooks();
        });
    }
}