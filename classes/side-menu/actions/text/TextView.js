class TextView extends EventEmitter {
    constructor () {
      super();
      this.container = null;
      this.init();
    }
  
          init = () => {
            this.generateDOM();
            this.addListeners();
          }
  
          getStringDOM = () => {
            const stringDOM = `
              <div class="action-text-container">
                <h3>Pole tekstowe</h3>
                <div class="action-text-button">
                  <div class="action-text-svg-container">
                  <svg class="action-text-svg" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M9.93 13.5h4.14L12 7.98zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.05 16.5l-1.14-3H9.17l-1.12 3H5.96l5.11-13h1.86l5.11 13h-2.09z"/></svg>
                  </div>
                  <div class="action-text-text-container">
                    <p>Pole tekstowe</p>
                  </div>
                </div>
              </div>`;
            return stringDOM;
          }
  
          generateDOM = () => {
            const parser = new DOMParser();
            const stringDOM = parser.parseFromString(this.getStringDOM(), 'text/html');
            const container = stringDOM.querySelector('.action-text-container');
            this.container = container;
          }

          addListeners = () => {
              const actionTextButton = this.container.querySelector('.action-text-button');
              actionTextButton.addEventListener('click', this.userClickedOnText);
          }
  
          userClickedOnText = (e) => {
            this.emit('textClicked', e.target.src);
          }
  
          activate = () => {
            actionsContainer.appendChild(this.container);
          }
  
          disable = () => {
            this.container.remove();
          }
          
  }
  