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
    this.page = document.getElementById("story_page")

    this.createMoreBlock()
    this.story = new Story(ink)
    this.continueStory()
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

  update() {
    this.updateMoreBlock()
  }

  createMoreBlock() {
    let div = document.createElement("div")
    div.className = "center_fade_in"
    div.innerHTML = "..."
    div.className = "center_fade_in narration more"
    div.onclick = () => this.continueStory()
    footer.appendChild(div)
    this.moreElem = div
  }

  updateMoreBlock() {
    this.moreElem.style.visibility = this.br ? "visible" : "hidden"
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
      this.queue.enqueue_fun(() => this.addText(this.page, cmd))
      return true
    case 'choices':
      this.queue.enqueue_fun(() => {
        const opt = new Options(cmd)
        this.page.appendChild(opt.div)
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
      this.queue.enqueue(() => new Promise((resolve) => resolve(this.removeAll(this.page))))
      return true
    case ':start':
      //this.queue.enqueue_fun(() => this.showNavBar())
      return true
    case ':block':
      this.currentClass = this.blockClsMap[cmd.params[0]]
    default: return true
    case ':thumbnail':
      this.queue.enqueue_fun(() => this.addThumbnail(this.page, cmd.params[0]))
      return true
    case ':bg':
      this.changeBg(cmd.params[0])
      return true
    case ':travel':
      this.queue.enqueue_fun(() => this.travelToLocation(cmd.params[0], true))
      return true
    case ':page':
      this.queue.enqueue_fun(() => {
        this.changePage(this.btnToPageLookup[cmd.params[0]].id)
      })
      return true
    case ':gameover':
      
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
      if (this.br) {
        this.br = false
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
