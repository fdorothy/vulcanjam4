import { Game } from './game'

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

    let button = document.createElement("button")
    button.innerHTML = this.name
    button.className = "narration option"
    button.onclick = () => {
      Game.singleton.travelToLocation(this.knot, true)
    }
    if (Game.singleton.currentLocation === this.knot)
      button.className = "narration option selected"
    else
      button.className = "narration option deselected"
    this.div.appendChild(button)
    this.div.className = "location"
  }
}
