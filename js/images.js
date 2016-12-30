class Images {
  constructor(container) {
    this.container = container;
    this.generateCollection();

    window.addEventListener('resize', this.decept.bind(this));
  }

  get source()      { return this._source }
  get quantity()    { return 4 }
  get first()       { return this.collection[0] }
  get penultimate() { return this.collection[this.quantity - 2] }
  get last()        { return this.collection[this.quantity - 1] }
  get loaded()      { return this.collection.every((image) => !!image.aspectRatio) }

  set source(value) {
    this._source = value;
    this.collection.forEach((image) => image.src = value);
  }

  scroll() { this.collection.forEach((image) => image.zoomIn()) }

  generateCollection() {
    this.collection = [];

    for (var i = 0; i < this.quantity; i++) {
      this.collection.push(new Image(this.container));
    }
  }

  inceptiualize() {
    if (this.penultimate.filledContainer) {
      var biggestImage = this.collection.pop();
      biggestImage.scaleTo(0);
      this.collection.unshift(biggestImage);

      this.zAlign();
      // this.decept(); <- please test
    }
  }

  zAlign() {
    for (var i in this.collection) {
      this.collection[i].element.style.zIndex = this.quantity - i;
    }
  }

  decept() {
    if (!this.loaded) { return false };

    for (var i in this.collection) {
      this.collection[i].renderScaled(i / (this.quantity - 1));
    }

    this.zAlign();
  }
}
