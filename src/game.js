import { Story } from './story'
import { Options } from './options'
import { Narration } from './narration'
import { Thumbnail } from './thumbnail'
import { Location } from './location'
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
    this.bgfader = document.getElementById('bgfader')
    this.body = document.getElementById('body')
    this.content = document.getElementById("content")
    this.footer = document.getElementById("footer")
    this.storyBtn = document.getElementById("story")
    this.locationsBtn = document.getElementById("locations")
    this.itemsBtn = document.getElementById("items")
    this.settingsBtn = document.getElementById("settings")
    this.navBtns = [this.storyBtn, this.locationsBtn, this.itemsBtn, this.settingsBtn]

    this.story_page = document.getElementById("story_page")
    this.settings_page = document.getElementById("settings_page")
    this.locations_page = document.getElementById("locations_page")
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

    this.locations = { }
    this.shownLocations = { }

    this.addLocation('Morris Ave', 'A cobblestone alley', 'public/skyline2.png', 'morris')
    this.addLocation('Rainbow Bridge', 'An old train bridge with rainbow lights', 'public/underpass.png', 'rainbow_bridge')
    this.addLocation('Avondale Brewery', 'A brewery bar venue near downtown', '', 'avondale_brewery')
    this.addLocation('Vulcan', 'A giant statue on Red Mountain', '', 'vulcan')
    this.addLocation('Alabama Theater', 'An old movie palace, built in 1927', '', 'alabama_theater')
    this.currentLocation = 'morris'
    this.revealedLocations = 0

    this.hideNavBar()
    this.createMoreBlock()
    this.textBlock = null
    this.story = new Story(ink)
    this.continueStory()
    this.pingButtons = []
  }

  fadeIn() {
    this.bgfader.className = 'fade_in'
  }

  fadeOut() {
    this.bgfader.className = 'fade_out'
  }

  fadeOutThen(fun) {
    this.fadeOut()
    setTimeout(fun, 1.5 * 1000.0)
  }

  changeBg(src) {
    const url = 'url("' + src + '")';
    console.log(url)
    if (this.body.style.backgroundImage !== url) {
      if (!this.body.style.backgroundImage) {
        console.log('fading in')
        this.body.style.backgroundImage = url;
        this.fadeIn()
      } else {
        console.log('fading out ' + this.body.style.backgroundImage)
        this.fadeOutThen(() => {
          this.body.style.backgroundImage = url;
          this.fadeIn()
        })
      }
    }
  }

  travelToLocation(knot, clear) {
    this.currentLocation = knot
    const location = this.locations[name]
    this.story.ink.ChoosePathString(knot)
    if (clear)
      this.removeAll(this.story_page)
    this.changePage('story_page')
    this.continueStory()
    this.update()
  }

  addLocation(name, desc, imgUrl, knot) {
    this.locations[knot] = new Location(name, desc, imgUrl, knot)
    this.locations[knot].createElements()
  }

  revealLocation(knot) {
    console.log('revealing ' + knot)
    if (this.locations[knot].revealed) {
    } else {
      this.revealedLocations++
      this.locations_page.appendChild(this.locations[knot].div)
      if (this.revealedLocations%2 === 1)
        this.locations[knot].div.className = "narration left_fade_in"
      else
        this.locations[knot].div.className = "narration right_fade_in"
      this.locations[knot].ping = true
      this.pingLocations = true
      this.locations[knot].revealed = true
    }
  }

  update() {
    for (let i in this.navBtns) {
      const btn = this.navBtns[i]
      console.log(this.btnToPageLookup[btn.id])
      console.log(this.page.id)
      if (this.btnToPageLookup[btn.id].id === this.page.id)
        btn.className = "narration option nav highlighted"
      else {
        btn.className = "narration option nav"
      }
    }

    if (this.pingLocations)
      this.locationsBtn.className = "narration option nav blink_slow"

    const location = this.locations[this.currentLocation]
    if (location != null && location.imgUrl != null) {
      this.changeBg(location.imgUrl);
    } else {
      this.body.style.backgroundImage = null;
    }

    this.updateMoreBlock()
  }

  changePage(id) {
    this.page.style.display = "none"
    this.page = document.getElementById(id)
    this.page.style.display = "block"

    if (id === 'locations_page') {
      this.pingLocations = false
    }
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

  addText(page, cmd) {
    const n = new Narration(this.currentClass)
    n.addText(cmd.value)
    page.appendChild(n.textElem)
  }

  addThumbnail(page, src) {
    const t = new Thumbnail(src, "center_fade_in img")
    page.appendChild(t.elem)
  }

  interpretCommand(cmd) {
    switch (cmd.type) {
    default:
    case 'done': return false
    case 'tag': return this.interpretTag(cmd)
    case 'empty': return true
    case 'text':
      this.addText(this.story_page, cmd)
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
      this.removeAll(this.story_page)
      return true
    case ':start':
      this.showNavBar()
      return true
    case ':block':
      this.currentClass = this.blockClsMap[cmd.params[0]]
    default: return true
    case ':location':
      this.revealLocation(cmd.params[0])
      return true
    case ':thumbnail':
      this.addThumbnail(this.story_page, cmd.params[0])
      return true
    }
  }

  removeAll(page) {
    const removeChilds = (parent) => {
      while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    };
    removeChilds(page)
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
