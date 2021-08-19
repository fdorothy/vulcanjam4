export class Location {
  constructor(name, desc, imgUrl, knot) {
    this.name = name
    this.desc = desc
    this.imgUrl = imgUrl
    this.knot = knot
    this.revealed = false
    this.ping = false
  }
    
  createElements() {
    this.div = document.createElement("div")
    this.div.className = "narration"
    this.p = document.createElement("p")
    this.p.innerHTML = this.name
    this.div.className = "location"
    this.div.appendChild(this.p)
  }

  addText(txt) {
    this.text += txt
    this.p.innerHTML = this.text
  }

  play() {
    this.p.innerHTML = this.text
  }
}
