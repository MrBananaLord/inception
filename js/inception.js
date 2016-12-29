class Inception {
  static get inception() {
    if (!this._inception) {
      this._inception = new Inception;
    }

    return this._inception
  }

  constructor() {
    this.dropField    = document.querySelector("#dropField");
    this.displayField = document.querySelector("#displayField");

    this.inceptionRing = Array.prototype.slice.call(document.querySelectorAll("img")).map(function(element) {
      return new Image(element);
    });

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    document.body.addEventListener('mousewheel', this.scroll.bind(this));
    window.addEventListener('resize', this.decept.bind(this));
  }

  dropHandler(event) {
    event.preventDefault();

    this.dropField.classList.add("hidden")
    this.displayField.classList.remove("hidden");

    for (var image of this.inceptionRing) { image.element.src = URL.createObjectURL(event.dataTransfer.files[0]) }
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  scroll(event) {
    for (var image of this.inceptionRing) { image.zoomIn() }
  }

  inceptiualize() {
    var secondToLastImage = this.inceptionRing[this.inceptionRing.length - 2];

    if (secondToLastImage.filledContainer) {
      var biggestImage = this.inceptionRing.pop();
      biggestImage.minimize();
      this.inceptionRing.unshift(biggestImage);

      this.zAlignImages();
      // this.decept();
    }
  }

  zAlignImages() {
    for (var i in this.inceptionRing) {
      this.inceptionRing[i].element.style.zIndex = this.inceptionRing.length - i;
    }
  }

  get lastImage() {
    return this.inceptionRing[this.inceptionRing.length - 1];
  }

  get firstImage() {
    return this.inceptionRing[0];
  }

  get ready() {
    if (!this._ready) {
      this._ready = !!this.lastImage.aspectRatio;
    }

    return this._ready;
  }

  decept() {
    if (!this.ready) { return false };

    this.lastImage.fill();
    this.firstImage.minimize();

    for (var i = this.inceptionRing.length - 2; i > 0; i--) {
      this.inceptionRing[i].renderScaled(i / (this.inceptionRing.length - 1));
    }

    this.zAlignImages();
  }
}
