let ink = require('inkjs').Story;

export class Story {
  constructor(json, game) {
    this.game = game;
    this.ink = new ink(json);
  }

  next() {
    if (this.ink.canContinue) {
      const txt = this.ink.Continue().trim()
      if (txt === "") {
        // ignore empty lines
        return { type: "empty" }
      } else if (txt[0] === ':') {
        // tag
        const params = txt.split(" ")
        const name = params[0]
        return { type: "tag", name, params: params.slice(1) }
      } else {
        return { type: "text", value: txt }
      }
    } else {
      // do we have any options to select?
      if (this.ink.currentChoices.length > 0) {
        const choices = []
        for (let i in this.ink.currentChoices) {
          choices.push(this.ink.currentChoices[i].text)
        }
        return { type: "choices", choices }
      } else {
        return { type: "done" }
      }
    }
  }
}
