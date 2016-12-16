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

    this.outerImage      = new Image(document.querySelector("#outerImage"), this);
    this.innerImage      = new Image(document.querySelector("#innerImage"), this);
    this.innerInnerImage = new Image(document.querySelector("#innerInnerImage"), this);

    this.inceptionRing = [this.innerInnerImage, this.innerImage, this.outerImage];
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

    this.outerImage.src = URL.createObjectURL(event.dataTransfer.files[0]);
    this.innerImage.src = URL.createObjectURL(event.dataTransfer.files[0]);
    this.innerImage.scale = 0.5;
    this.innerInnerImage.src = URL.createObjectURL(event.dataTransfer.files[0]);
    this.innerInnerImage.scale = 0.5 / 8;
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  outerImageLoadHandler(event) {
    // this.resetPointPositions();
  }

  scroll(event) {
    if (event.deltaY > 0) {
      this.outerImage.zoomOut();
      this.innerImage.zoomOut();
      this.innerInnerImage.zoomOut();
    } else {
      this.outerImage.zoomIn();
      this.innerImage.zoomIn();
      this.innerInnerImage.zoomIn();
    }
  }

  inceptiualize() {
    var biggestImage = this.inceptionRing.pop();
    biggestImage.scale = 0.5 / 8;
    biggestImage.center();
    this.inceptionRing.unshift(biggestImage);

    for (var i = 0; i < this.inceptionRing.size; i++) {
      this.inceptionRing[i].style.zIndex = this.inceptionRing.size - i;
    }
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
    return 100;
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
    this.center();
  }

  center() {
    if (this.constrainingDimension == 'y') {
      this.resizeTo(this.scale * this.width * (this.container.clientHeight / this.height), this.scale * this.container.clientHeight);
    } else {
      this.resizeTo(this.scale * this.container.clientWidth, this.scale * this.height * (this.container.clientWidth / this.width));
    }

    this.resetMargin();
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
