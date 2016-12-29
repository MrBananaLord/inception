class Image {
  constructor(element, inception) {
    this.element   = element;
    this.inception = inception;
    this.container = inception.displayField;
    this.element.addEventListener("load", this.onload.bind(this));
  }

  set src(source) {
    this.element.src = source;
  }

  set scale(value) {
    this._resizeRatio = value;
  }

  get scale() {
    return this._resizeRatio || 1;
  }

  get scrollRatio() {
    return 20;
  }

  get constrainingDimension() {
    if ((this.width * (this.container.clientHeight / this.height)) <= this.container.clientWidth) {
      return 'y';
    } else {
      return 'x';
    }
  }

  get filledContainer() {
    if (this.constrainingDimension == 'y') {
      return this.width > this.container.clientWidth
    } else {
      return this.height > this.container.clientHeight
    }
  }

  get aspectRatio() {
    return this._aspectRatio;
  }

  set aspectRatio(value) {
    this._aspectRatio = value;
  }

  onload(event) {
    event.preventDefault();
    this.aspectRatio = this.width / this.height;
    this.inception.decept();
  }

  renderScaled(scale) {
    this.scaleTo(this.distance * scale);
    this.resetMargin();
  }

  scaleTo(size) {
    if (this.constrainingDimension == 'y') {
      this.resizeTo(size, size / this.aspectRatio);
    } else {
      this.resizeTo(size * this.aspectRatio, size);
    }

    this.resetMargin();
  }

  get distance() {
    if (this.constrainingDimension == 'y') {
      return this.container.clientWidth;
    } else {
      return this.container.clientHeight;
    }
  }

  resetMargin() {
    this.element.style.marginLeft = -this.element.clientWidth / 2;
    this.element.style.marginTop = -this.element.clientHeight / 2;
  }

  zoomIn() {
    this.resizeTo(this.width + this.scrollRatio, this.height + (this.scrollRatio / this.aspectRatio));
    this.resetMargin();

    if (this.filledContainer) {
      this.inception.inceptiualize();
    }
  }

  get height() {
    return parseInt(this.element.style.height) || this.element.clientHeight
  }

  get width() {
    return parseInt(this.element.style.width) || this.element.clientWidth
  }

  resizeTo(width, height) {
    this.element.style.height = height;
    this.element.style.width  = width;
  }
}
