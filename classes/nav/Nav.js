class Nav extends EventEmitter {
  constructor (photoBook) {
    super();
    this.photoBook = photoBook;
    this.navLeft = document.querySelector('.content .nav.left');
    this.navRight = document.querySelector('.content .nav.right');
    this.init();
  }

  init = () => {
      this.photoBook.on('changed', () => {
        console.log("ELKO");
        this.disableOrActivateButton();
      });
      this.navLeft.addEventListener('click', this.leftClicked);
      this.navRight.addEventListener('click', this.rightClicked);
      this.disableOrActivateButton();
  }

  leftClicked = () => {
      const pageIndex = this.photoBook.activePageIndex;
      if(pageIndex - 1 >= 0){
          this.changeVisiblePage('left');
      }
      this.disableOrActivateButton();
  }

  rightClicked = () => {
        const pagesAmout = this.photoBook.pages.length;
        const pageIndex = this.photoBook.activePageIndex;
        if(pageIndex < pagesAmout){
            this.changeVisiblePage('right');
        }
        this.disableOrActivateButton();
    }

  disableOrActivateButton = () => {
      // console.log(this.photoBook.pages);
      // console.log(this.photoBook.activePage);
    const pagesAmout = this.photoBook.pages.length;
    const pageIndex = this.photoBook.activePageIndex;    
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

  changeVisiblePage = (name) => {
    if(name === 'left'){
      this.photoBook.showPreviousPage();
    } else {
      this.photoBook.showNextPage();
    }
  }

  disbaleButton = (btn) => {
    btn.style.background = "grey";
  }

  activateButton = (btn) => {
    btn.style.background = "";
  }
}
