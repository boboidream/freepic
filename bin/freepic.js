#! /usr/bin/env node

/*
 * title: free-pic
 * author: boboidream
 * version: 0.0.4
 * date: 2016.09.17
 * updata: 2017.04.22
 * site: http://zwb.io/
 */

const fs = require("fs")
const path = require('path')
const readline = require('readline')
const request = require('request')
const imgcat = require('imgcat')

const desktop = require('../lib/module/desktop')
const choseSrc = require('../lib/module/chose-src')
const argv = require('../lib/module/command')
const timer = require('../lib/module/timer')
const feconsole = require('../lib/module/fe-console')

timer.run() // Timing starts

class FreePic {
  constructor() {
    this.dir = argv.desktop ? desktop : process.cwd()
    this.name = `freepic-${new Date().getTime()}.jpg`
    this.lucky = [
      '🌽', '🐬', '🐶', '🐨', '🐯',
      '⛄', '🐌', '🍭', '🐔' , '🐷']
    this.opts = {
      width: argv.width,
      height: argv.height,
      about: argv.about
    }
    this.listenFlag = false
    this.imgInfo = null
  }

  go() {
    let lucky = this.lucky[Math.floor(Math.random()*10)],
        race = choseSrc(this.opts)

    console.log(`| mascot ${lucky}`)
    
    race.then((res, err) => {
        console.log(`| original: ${res.original}`)
        this.imgInfo = res
        this.dealURL(res)
      })
    race.catch(err => console.log(`race: ${err}`))
  }

  dealURL(res) {
    if (argv.preview) {
      imgcat(res.preview)
        .then(image => {
          console.log(image)
          feconsole.log('y): download',
                        'd): download to Desktop',
                        'r): retry to get another picture',
                        'n): exit')
          console.log('')

          if (!this.listenFlag) this.listenInput() // listen user input once
        })
        .catch(err => {
          console.log('| notice: preview need iTerm2 version >= 3')
          this.download()
        })
    } else {
      this.download()
    }
  }

  listenInput() {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.setRawMode(true)
    process.stdin.on('keypress', (str, key) => {
      str = str.toLowerCase()
      if (str === 'y') {
        this.download()
      } else if (str === 'd'){
        this.dir = desktop
        this.download()
      } else if (str === 'r'){
        this.go()
      } else if (str === 'n') {
        process.exit()
      } else {
        feconsole.log('notice: press key y | d | r | n')
      }
    })

    this.listenFlag = true
  }

  download() {
    let url = this.imgInfo.url,
        self = this,
        saveto = path.join(self.dir, self.name)

    request(url)
      .on('response', (response) => {
        console.log(`| save to: ${saveto}`)
        timer.end()
      })
      .pipe(fs.createWriteStream(saveto))
      .on('finish', () => {
        process.exit()
      })

    }
  
  testDown(url) {
    this.download(url)
  }
}


// get free picture
var freepic = new FreePic()

freepic.go()






