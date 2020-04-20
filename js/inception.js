class Inception {
    static get inception() {
        if (!this._inception) {
            this._inception = new Inception;
        }

        return this._inception
    }

    initialize() {
        this.initializeGui()
        this.initializeImages();
        this.intervalTime = 25;

        document.addEventListener("keydown", e => this.handleKeydown(e))
    }

    initializeGui() {
        this.displayField = document.querySelector("#displayField");
        this.dropField = document.querySelector("#dropField");

        this.dropField.addEventListener("drop", this.dropHandler.bind(this));
        this.dropField.addEventListener("dragover", this.dragoverHandler.bind(this));
    }

    initializeImages() {
        this.images = new Images(this.displayField);
    }

    dropHandler(event) {
        event.preventDefault();

        this.dropField.classList.add("hidden");
        this.displayField.classList.remove("hidden");

        this.images.source = URL.createObjectURL(event.dataTransfer.files[0]);

        this.restartAnimation();
    }

    restartAnimation() {
        clearInterval(this.interval);

        this.interval = setInterval(() => this.images.scroll(), this.intervalTime);
    }

    handleKeydown(e) {
        if (e.key == "ArrowUp") {
            this.intervalTime -= 5;
            console.log(this.intervalTime);
            this.restartAnimation();
        } else if (e.key == "ArrowDown") {
            this.intervalTime += 5;
            console.log(this.intervalTime);
            this.restartAnimation();
        }
    }

    dragoverHandler(event) { event.preventDefault(); }
    inceptiualize() { this.images.inceptiualize() }
    decept() { this.images.decept() }
};