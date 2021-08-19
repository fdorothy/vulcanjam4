import { Story } from './story'
import { Options } from './options'
import { Narration } from './narration'
import { Page } from './page'
const ink = require('../story.ink.json');

export class Game {
  static singleton = null;
  
  constructor() {
    Game.singleton = this
    // handle keyboard events here
    const handleEvent = this.handleEvent
    window.addEventListener("keydown", (e) => handleEvent(e))
    this.currentClass = 'left_fade_in'
    this.blockClsMap = {
      left: 'left_fade_in',
      right: 'right_fade_in',
      center: 'center_fade_in',
      text: 'center_fade_in text',
      title: 'center_fade_in title',
      subtitle: 'center_fade_in subtitle'
    }
    this.content = document.getElementById("content")
    this.footer = document.getElementById("footer")
    this.storyBtn = document.getElementById("story")
    this.locationsBtn = document.getElementById("locations")
    this.itemsBtn = document.getElementById("items")
    this.settingsBtn = document.getElementById("settings")
    this.navBtns = [this.storyBtn, this.locationsBtn, this.itemsBtn, this.settingsBtn]

    this.story_page = document.getElementById("story_page")
    this.settings_page = document.getElementById("settings_page")
    this.page = this.story_page
    this.storyBtn.onclick = () => this.changePage("story_page")
    this.settingsBtn.onclick = () => this.changePage("settings_page")
    this.locationsBtn.onclick = () => this.changePage("locations_page")
    this.itemsBtn.onclick = () => this.changePage("items_page")
    this.btnToPageLookup = {
      'story': story_page,
      'settings': settings_page,
      'locations': locations_page,
      'items': items_page
    }

    this.hideNavBar()
    this.createMoreBlock()
    this.textBlock = null
    this.story = new Story(ink)
    this.continueStory()
  }

  update() {
    for (let i in this.navBtns) {
      const btn = this.navBtns[i]
      console.log(this.btnToPageLookup[btn.id])
      console.log(this.page.id)
      if (this.btnToPageLookup[btn.id].id === this.page.id)
        btn.className = "narration option nav highlighted"
      else
        btn.className = "narration option nav"
    }
    this.updateMoreBlock()
  }

  changePage(id) {
    this.page.style.display = "none"
    this.page = document.getElementById(id)
    this.page.style.display = "block"
    this.update()
  }

  hideNavBar() {
    for (let i in this.navBtns)
      this.navBtns[i].style.display = "none"
  }

  showNavBar() {
    for (let i in this.navBtns)
      this.navBtns[i].style.display = "inline"
  }
  
  createMoreBlock() {
    let div = document.createElement("div")
    div.className = "center_fade_in"
    div.innerHTML = "press enter to continue"
    div.className = "narration more"
    div.onclick = () => this.continueStory()
    footer.appendChild(div)
    this.moreElem = div
  }

  updateMoreBlock() {
    this.moreElem.style.visibility = this.page.id == "story_page" && this.story.ink.canContinue ? "visible" : "hidden"
  }

  continueStory() {
    let run = true
    while (run) {
      let cmd = this.story.next()
      console.log(cmd)
      run = this.interpretCommand(cmd)
    }
    this.update()
  }

  interpretCommand(cmd) {
    switch (cmd.type) {
    default:
    case 'done': return false
    case 'tag': return this.interpretTag(cmd)
    case 'empty': return true
    case 'text':
      const n = new Narration(this.currentClass)
      n.addText(cmd.value)
      this.story_page.appendChild(n.textElem)
      return true
    case 'choices':
      const opt = new Options(cmd)
      this.story_page.appendChild(opt.div)
      return false
    }
  }

  interpretTag(cmd) {
    switch (cmd.name) {
    case ':br':
      return false
    case ':clear':
      this.removeAll()
      return true
    case ':start':
      this.showNavBar()
      return true
    case ':block':
      this.currentClass = this.blockClsMap[cmd.params[0]]
    default: return true
    }
  }

  removeAll() {
    const removeChilds = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    };
    removeChilds(this.page)
  }

  setText(text) {
    document.getElementById
    this.display.getContainer().className = "shake";
    this.play_sfx('hit')
    setTimeout(() => { this.display.getContainer().className = "" }, 100)
  }

  choose(idx) {
    this.story.ink.ChooseChoiceIndex(idx)
    this.continueStory()
  }

  handleEvent = (e) => {
    let keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    if (event.keyCode == 13) { // enter
      if (this.page.id == 'story_page') {
        if (this.story.ink.currentChoices.length == 0)
          this.continueStory()
      }
    }

    let code = e.keyCode;

    if (!(code in keyMap)) {
      return;
    } else {
      this.choose(keyMap[code])
    }
    e.preventDefault()
  }

  sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}
