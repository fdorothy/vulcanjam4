export class Narration {
  constructor(cls) {
    this.textElem = document.createElement("div")
    this.p = document.createElement("p")
    this.textElem.className = "narration " + cls
    this.textElem.innerHTML = ""
    this.textElem.appendChild(this.p)
    this.text = ""
  }

  addText(txt) {
    this.text += txt
    this.p.innerHTML = this.text
  }

  play() {
    this.p.innerHTML = this.text
  }
}
