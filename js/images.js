class Images {
  constructor(container) {
    this.container = container;
    this.collection = Array.prototype.slice.call(document.querySelectorAll("img")).map(function(element) {
      return new Image(element, container);
    });
  }

  get first()       { return this.collection[0] }
  get penultimate() { return this.collection[this.length - 2] }
  get last()        { return this.collection[this.length - 1] }
  get length()      { return this.collection.length }
  get loaded()      { return this.collection.every((image) => !!image.aspectRatio) }
  set source(value) { this.collection.forEach((image) => image.src = value) }

  scroll() { this.collection.forEach((image) => image.zoomIn()) }

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
      this.collection[i].element.style.zIndex = this.length - i;
    }
  }

  decept() {
    if (!this.loaded) { return false };

    for (var i in this.collection) {
      this.collection[i].renderScaled(i / (this.length - 1));
    }

    this.zAlign();
  }
}
