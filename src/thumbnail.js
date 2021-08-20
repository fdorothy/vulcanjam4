export class Thumbnail {
  constructor(src, cls) {
    this.elem = document.createElement("img")
    this.elem.className = "thumbnail " + cls
    this.elem.src = src
  }
}
