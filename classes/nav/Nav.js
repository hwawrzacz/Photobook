class Nav extends EventEmitter {
  constructor(photoBook) {
    super();
    this.photoBook = photoBook;
    this.navLeft = document.querySelector('.content .nav.left');
    this.navRight = document.querySelector('.content .nav.right');
    this.btnToggleMenu = document.querySelector(`#button-menu-toggle`);
    this.init();
  }

  init = () => {
    this.photoBook.on('changed', () => {
      console.log("ELKO");
      this.disableOrActivateButton();
    });
    this.navLeft.addEventListener('click', this.leftClicked);
    this.navRight.addEventListener('click', this.rightClicked);
    this.btnToggleMenu.addEventListener('click', this.toggleMenu);
    this.disableOrActivateButton();
  }

  leftClicked = () => {
    const pageIndex = this.photoBook.activePageIndex;
    if (pageIndex - 1 >= 0) {
      this.changeVisiblePage('left');
    }
    this.disableOrActivateButton();
  }

  rightClicked = () => {
    const pagesAmout = this.photoBook.pages.length;
    const pageIndex = this.photoBook.activePageIndex;
    if (pageIndex < pagesAmout) {
      this.changeVisiblePage('right');
    }
    this.disableOrActivateButton();
  }

  disableOrActivateButton = () => {
    // console.log(this.photoBook.pages);
    // console.log(this.photoBook.activePage);
    const pagesAmout = this.photoBook.pages.length;
    const pageIndex = this.photoBook.activePageIndex;
    if (pageIndex === 0) {
      this.disbaleButton(this.navLeft);
    } else {
      this.activateButton(this.navLeft);
    }

    if (pageIndex === pagesAmout - 1) {
      this.disbaleButton(this.navRight);
    } else {
      this.activateButton(this.navRight);
    }
  }

  changeVisiblePage = (name) => {
    if (name === 'left') {
      this.photoBook.showPreviousPage();
    } else {
      this.photoBook.showNextPage();
    }
  }

  disbaleButton = (btn) => {
    btn.style.visibility = "hidden";
  }

  activateButton = (btn) => {
    btn.style.visibility = "";
  }

  toggleMenu = () => {
    const buttonMenuToggleIcon = buttonMenuToggle.querySelector('i');
    const menu = document.querySelector('.side-menu');
    const content = document.querySelector(`.content`);

    content.classList.toggle(`padding-left`);
    buttonMenuToggle.classList.toggle('rotate');
    buttonMenuToggleIcon.innerHTML = toggleIcon(buttonMenuToggleIcon.innerHTML);
    menu.classList.toggle('visible');
  };

  toggleIcon = (currentValue) => {
    let result;

    if (currentValue == 'keyboard_arrow_up') {
      result = 'menu';
    } else result = 'keyboard_arrow_up';

    return result;
  };
}
