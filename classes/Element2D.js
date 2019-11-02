class Element2D {
  get top () {
    return this.Top;
  }

  set top (value) {
    this.Top = value;
    this.element.style.setProperty('top', value + 'px');
  }

  get left () {
    return this.Left;
  }

  set left (value) {
    this.Left = value;
    this.element.style.setProperty('left', value + 'px');
  }

  get width () {
    return this.Width;
  }

  set width (value) {
    this.Width = value;
    this.element.style.setProperty('width', value + 'px');
  }

  get height () {
    return this.Height;
  }

  set height (value) {
    this.Height = value;
    this.element.style.setProperty('height', value + 'px');
  }

  get rotation () {
    return this.Rotation;
  }

  set rotation (value) {
    this.Rotation = value;
    this.element.style.setProperty('transform', 'rotate(' + value + 'deg)');
  }

  // get bottom() {
  //     return this.bottom;
  // }
  // set bottom(value);

  // get width() {
  //     return this.width;
  // }
  // set width(value);

  // get height() {
  //     return this.height;
  // }
  // set height(value);

  // get rotation() {
  //     return this.rotation;
  // }
  // set rotation(value);
}
