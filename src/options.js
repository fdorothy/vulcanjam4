import { Game } from './game'

export class Options {
  constructor(cmd) {
    this.div = document.createElement("div")
    this.div.className = "center_fade_in"
    this.selected = false
    this.buttons = []

    for (let choice in cmd.choices) {
      let button = document.createElement("button")
      button.innerHTML = cmd.choices[choice]
      button.className = "narration option"
      let x = choice
      button.onclick = () => {
        if (!this.selected) {
          Game.singleton.choose(x)
          for (let i in this.buttons) {
            let btn = this.buttons[i]
            btn.disabled = true
            if (x == i)
              btn.className = "narration option selected"
            else
              btn.className = "narration option deselected"
          }
        }
        this.selected = true
      }
      this.div.appendChild(button)
      this.buttons.push(button)
    }
  }
}
