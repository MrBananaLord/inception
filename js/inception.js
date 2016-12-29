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

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    document.body.addEventListener('mousewheel', this.scroll.bind(this));
    window.addEventListener('resize', this.decept.bind(this));

    this.initializeRing();
  }

  initializeRing() {
    this.ring = Array.prototype.slice.call(document.querySelectorAll("img")).map(function(element) {
      return new Image(element, this);
    }.bind(this));
  }

  dropHandler(event) {
    event.preventDefault();

    this.dropField.classList.add("hidden")
    this.displayField.classList.remove("hidden");

    for (var image of this.ring) { image.element.src = URL.createObjectURL(event.dataTransfer.files[0]) }
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  scroll(event) {
    for (var image of this.ring) { image.zoomIn() }
  }

  inceptiualize() {
    var secondToLastImage = this.ring[this.ring.length - 2];

    if (secondToLastImage.filledContainer) {
      var biggestImage = this.ring.pop();
      biggestImage.minimize();
      this.ring.unshift(biggestImage);

      this.zAlignImages();
      // this.decept();
    }
  }

  zAlignImages() {
    for (var i in this.ring) {
      this.ring[i].element.style.zIndex = this.ring.length - i;
    }
  }

  get lastImage() {
    return this.ring[this.ring.length - 1];
  }

  get firstImage() {
    return this.ring[0];
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

    for (var i = this.ring.length - 2; i > 0; i--) {
      this.ring[i].renderScaled(i / (this.ring.length - 1));
    }

    this.zAlignImages();
  }
}
