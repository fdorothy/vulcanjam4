import { Story } from './story'
import { Options } from './options'
import { Narration } from './narration'
import { Thumbnail } from './thumbnail'
import { Location } from './location'
import { Page } from './page'
import { Queue } from './queue'
const ink = require('../story.ink.json');

export class Game {
  static singleton = null;
  
  constructor() {
    Game.singleton = this
    this.br = false
    this.queue = new Queue()
    this.backgroundImageUrl = null

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

  fadeIn = () => {
    return new Promise((resolve, reject) => {
      this.bgfader.className = 'fade_in'
      setTimeout(() => resolve(true), 1.5*1000)
    })
  }

  fadeOut = () => {
    return new Promise((resolve, reject) => {
      this.bgfader.className = 'fade_out'
      setTimeout(() => resolve(true), 1.5*1000)
    })
  }

  changeBg(src) {
    const url = 'url("' + src + '")';
    if (url !== this.backgroundImageUrl) {
      this.backgroundImageUrl = url
      if (!this.body.style.backgroundImage) {
        this.body.style.backgroundImage = this.backgroundImageUrl;
        this.queue.enqueue(this.fadeIn)
      } else {
        this.queue.enqueue(() =>
          this.fadeOut()
            .then(() => this.body.style.backgroundImage = this.backgroundImageUrl)
            .then(() => this.fadeIn())
        )
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
      this.changeBg(null);
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
    this.moreElem.style.visibility = this.page.id == "story_page" && this.br ? "visible" : "hidden"
  }

  continueStory() {
    this.br = false
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
      this.queue.enqueue_fun(() => this.addText(this.story_page, cmd))
      return true
    case 'choices':
      this.queue.enqueue_fun(() => {
        const opt = new Options(cmd)
        this.story_page.appendChild(opt.div)
      })
      return false
    }
  }

  interpretTag(cmd) {
    switch (cmd.name) {
    case ':br':
      this.queue.enqueue_fun(() => {
        this.br = true
        this.update()
      })
      return false
    case ':clear':
      this.queue.enqueue(() => new Promise((resolve) => resolve(this.removeAll(this.story_page))))
      return true
    case ':start':
      this.queue.enqueue_fun(() => this.showNavBar())
      return true
    case ':block':
      this.currentClass = this.blockClsMap[cmd.params[0]]
    default: return true
    case ':location':
      this.revealLocation(cmd.params[0])
      return true
    case ':thumbnail':
      this.queue.enqueue_fun(() => this.addThumbnail(this.story_page, cmd.params[0]))
      return true
    case ':travel':
      this.queue.enqueue_fun(() => this.travelToLocation(cmd.params[0], true))
      return true
    case ':page':
      this.queue.enqueue_fun(() => {
        this.changePage(this.btnToPageLookup[cmd.params[0]].id)
      })
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
        if (this.br) {
          this.br = false
          this.continueStory()
        }
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
