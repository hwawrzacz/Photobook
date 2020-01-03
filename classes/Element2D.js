class Element2D {

    get top() {
        return this.Top;
    }

    set top(value) {
        this.Top = value;
        this.element.style.setProperty("top", value + "px");
    }

    get left() {
        return this.Left;
    }

    set left(value) {
        this.Left = value;
        this.element.style.setProperty("left", value + "px");
    }

    get width() {
        return this.Width;
    }

    set width(value) {
        if (value >= this.minWidth) {
            this.Width = value;
            this.element.style.setProperty("width", value + "px");
        }
    }

    get height() {
        return this.Height;
    }

    set height(value) {
        if (value >= this.minHeight) {
            this.Height = value;
            this.element.style.setProperty("height", value + "px");
        }
    }

    get minWidth() {
        return this.MinWidth;
    }

    set minWidth(value) {
        this.MinWidth = value;
        this.element.style.setProperty("min-width", value + "px");
    }

    get minHeight() {
        return this.MinHeight;
    }

    set minHeight(value) {
        this.MinHeight = value;
        this.element.style.setProperty("min-height", value + "px");
    }

    get rotation() {
        return this.Rotation;
    }

    set rotation(value) {
        this.Rotation = value;
        this.element.style.setProperty("transform", "rotate(" + value + "deg)");
    }

    get zIndex() {
        return this.ZIndex;
    }

    set zIndex(value) {
        if (value >= 0) {
            this.ZIndex = value;
            this.element.style.setProperty(`z-index`, this.zIndex);
        }
    }
}