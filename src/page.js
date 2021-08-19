import { Game } from './game'

export class Page {
  constructor() {
    this.rows = []
  }

  push(elem) {
    this.rows.push(elem)
  }

  hideAll() {
    Game.singleton.removeAll()
  }
}
