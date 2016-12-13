function init() {
  var container = new Inception;
}

class Inception {
  constructor() {
    this.dropField    = document.getElementById("dropField");
    this.displayField = document.getElementById("displayField");
    this.outerImage   = document.getElementById("outerImage");
    // this.points       = document.getElementsByClassName("point");

    this.dropField.addEventListener("drop", this.dropHandler.bind(this));
    this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));

    this.outerImage.addEventListener("load", this.imageLoadHandler.bind(this));

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
  }

  dragoverHandler(event) {
    event.preventDefault();
  }

  imageLoadHandler(event) {
    this.outerImage.style.maxHeight = this.displayField.clientHeight;
    this.outerImage.style.maxWidth  = this.displayField.clientWidth;

    this.outerImage.style.top  = (this.displayField.clientHeight - this.outerImage.clientHeight) / 2;
    this.outerImage.style.left = (this.displayField.clientWidth - this.outerImage.clientWidth) / 2;

    // this.resetPointPositions();
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
