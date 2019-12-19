class Nav extends EventEmitter {
  constructor (photoBook) {
    super();
    this.photoBook = photoBook;
    this.navLeft = document.querySelector('.content .nav.left');
    this.navRight = document.querySelector('.content .nav.right');
    this.init();
  }

  init = () => {
      this.navLeft.addEventListener('click', this.leftClicked);
      this.navRight.addEventListener('click', this.rightClicked);
      this.disableOrActivateButton();
  }

  leftClicked = () => {
      const pageIndex = this.photoBook.pages.findIndex(this.photoBook.activePage);
      if(pageIndex - 1 >= 0){
          this.navEmiter('left');
      }
      this.disableOrActivateButton();
  }

  rightClicked = () => {
        const pagesAmout = this.photoBook.pages.length;
        const pageIndex = this.photoBook.pages.findIndex(this.photoBook.activePage);
        if(pageIndex < pagesAmout){
            this.navEmiter('right');
        }
        this.disableOrActivateButton();
    }

  disableOrActivateButton = () => {
      console.log(this.photoBook.pages);
      console.log(this.photoBook.activePage);
    const pagesAmout = this.photoBook.pages.length;
    const pageIndex = this.photoBook.pages.findIndex(this.photoBook.activePage);    
    if(pageIndex === 0){
        this.disbaleButton(this.navLeft);
    } else {
        this.activateButton(this.navLeft);
    }

    if(pageIndex === pagesAmout - 1){
        this.disbaleButton(this.navRight);
    } else {
        this.activateButton(this.navRight);
    }
  }

  navEmiter = (name) => {
    this.emit(name);
  }

  disbaleButton = (btn) => {
    btn.style.background = "grey";
  }

  activateButton = (btn) => {
    btn.removeAttribute('background');
  }
}
