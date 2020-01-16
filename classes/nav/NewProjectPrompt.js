class NewProjectDialog {
    constructor() {
        const promptDocument = new DOMParser().parseFromString(this.promptTemplate, `text/html`);
        this.element = promptDocument.querySelector(`.new-project-prompt`);
        this.addConfirmHook();
        this.addCancelHook();
    }

    addConfirmHook = () => {
        const confirmButton = this.element.querySelector(`.answer-yes`);
        confirmButton.addEventListener(`click`, () => {
            document.location.reload();
        });
    }

    addCancelHook = () => {
        const rejectButton = this.element.querySelector(`.answer-no`);
        rejectButton.addEventListener(`click`, () => {
            this.element.remove();
        });
    }

    promptTemplate = `
        <div class="new-project-prompt">
            <h2 class="new-project-title">Nowy projekt</h2>
            <p class="new-project-message">Stworzenie nowego projektu nadpisze dotychczasowy. Upewnij się, że praca
                została
                wyeksportowana. W&nbsp;przeciwnym wypadku wszystkie zmiany zostaną utracone.
                <br /> <br />
                Na pewno chcesz stworzyć nowy projekt?
            </p>
            <div class="new-project-button-wrapper">
                <button class="answer-yes">Tak</button>
                <button class="answer-no">Nie</button>
            </div>
        </div>`;
}