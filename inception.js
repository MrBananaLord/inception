function init() {
  var container = new Inception;
}

class Inception {
  static get inception() {
    if (!this._inception) {
      this._inception = new Inception;
    }

    return this._inception
  }

  constructor() {
    this.scrollRatio = 10;

    this.dropField    = document.querySelector("#dropField");
    this.displayField = document.querySelector("#displayField");

    this.inceptionRing = Array.prototype.slice.call(document.querySelectorAll("img")).map(function(element) {
      return new Image(element, this);
    }.bind(this));

    // this.points       = document.getElementsByClassName("point");

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    document.body.addEventListener('mousewheel', this.scroll.bind(this));

    // this.points[0].addEventListener("drag", this.dragPointHandler.bind(this));
    // this.points[0].addEventListener("dragend", this.dropPointHandler.bind(this));
  }

  dropHandler(event) {
    event.preventDefault();

    this.dropField.classList.add("hidden")
    this.displayField.classList.remove("hidden");
    this.displayField.style.width = document.body.clientWidth;
    this.displayField.style.height = document.body.clientHeight;

    for (var image of this.inceptionRing) { image.element.src = URL.createObjectURL(event.dataTransfer.files[0]) }
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  outerImageLoadHandler(event) {
    // this.resetPointPositions();
  }

  scroll(event) {
    if (event.deltaY > 0) {
      // for (var image of this.inceptionRing) { image.zoomOut() }
    } else {
      for (var image of this.inceptionRing) { image.zoomIn() }
    }
  }

  inceptiualize() {
    var secondToLastImage = this.inceptionRing[this.inceptionRing.length - 2];

    if (secondToLastImage.filledContainer) {
      var biggestImage = this.inceptionRing.pop();
      biggestImage.minimize();
      this.inceptionRing.unshift(biggestImage);

      this.zAlignImages();
    }
  }

  zAlignImages() {
    for (var i in this.inceptionRing) {
      this.inceptionRing[i].element.style.zIndex = this.inceptionRing.length - i;
    }
  }

  decept() {
    this.inceptionRing[this.inceptionRing.length - 1].fill();
    this.inceptionRing[0].minimize();

    for (var i = this.inceptionRing.length - 2; i > 0; i--) {
      this.inceptionRing[i].renderScaled(i / (this.inceptionRing.length - 1));
    }

    this.zAlignImages();
  }

  // resetPointPositions() {
  //   var middle = {
  //     x: this.displayField.clientWidth / 2,
  //     y: this.displayField.clientHeight / 2
  //   }
  //   var offset = 20
  //
  //   this.points[0].style.top  = middle.y - offset;
  //   this.points[0].style.left = middle.x - offset;
  //
  //   this.points[1].style.top  = middle.y + offset;
  //   this.points[1].style.left = middle.x - offset;
  //
  //   this.points[2].style.top  = middle.y + offset;
  //   this.points[2].style.left = middle.x + offset;
  //
  //   this.points[3].style.top  = middle.y - offset;
  //   this.points[3].style.left = middle.x + offset;
  // }

  // dragPointHandler(event) {
  //   event.preventDefault();
  //   this.points[0].classList.add("hidden");
  // }

  // dropPointHandler(event) {
  //   event.preventDefault();
  //   this.points[0].classList.remove("hidden");
  //   this.points[0].style.top  = event.clientY - 5;
  //   this.points[0].style.left = event.clientX - 5;
  // }
}

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
    return this.width / this.height;
  }

  onload(event) {
    event.preventDefault();
    this.inception.decept();
  }

  fill() {
    if (this.constrainingDimension == 'y') {
      this.resizeTo(this.container.clientWidth, this.container.clientWidth / this.aspectRatio);
    } else {
      this.resizeTo(this.container.clientHeight * this.aspectRatio, this.container.clientHeight);
    }

    this.resetMargin();
  }

  minimize() {
    this.scaleTo(20);
    this.resetMargin();
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
      return this.container.clientWidth - (20 * this.aspectRatio)
    } else {
      return this.container.clientHeight - (20 * this.aspectRatio)
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

  zoomOut() {
    this.resizeTo(this.width - this.scrollRatio, this.height - (this.scrollRatio / this.aspectRatio));
    this.resetMargin();
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
