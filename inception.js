function init() {
  var container = new Inception;
}

class Inception {
  constructor() {
    this.dropField            = document.getElementById("dropField");
    this.dropField.ondrop     = this.dropHandler.bind(this);
    this.dropField.ondragover = this.dragoverHandler.bind(this);

    this.displayField = document.getElementById("displayField");
    this.points       = document.getElementsByClassName("point");

    this.points[0].onmousedown = this.dragPointHandler.bind(this);
    this.points[0].onmouseup   = this.dropPointHandler.bind(this);

    this.outerImage        = document.getElementById("outerImage");
    this.outerImage.onload = this.imageLoadHandler.bind(this);
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

    this.resetPointPositions();
  }

  resetPointPositions() {
    var middle = {
      x: this.displayField.clientWidth / 2,
      y: this.displayField.clientHeight / 2
    }
    var offset = 20

    this.points[0].style.top  = middle.y - offset;
    this.points[0].style.left = middle.x - offset;

    this.points[1].style.top  = middle.y + offset;
    this.points[1].style.left = middle.x - offset;

    this.points[2].style.top  = middle.y + offset;
    this.points[2].style.left = middle.x + offset;

    this.points[3].style.top  = middle.y - offset;
    this.points[3].style.left = middle.x + offset;
  }

  dragPointHandler(event) {
    event.preventDefault();
    console.debug('drag');
    this.points[0].style.top  = event.clientY;
    this.points[0].style.left = event.clientX;
  }

  dropPointHandler(event) {
    event.preventDefault();
    console.debug('drop');
    this.points[0].style.top  = event.clientY;
    this.points[0].style.left = event.clientX;
  }
}
