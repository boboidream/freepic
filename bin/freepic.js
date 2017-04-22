#! /usr/bin/env node

/*
 * title: free-pic
 * author: boboidream
 * version: 0.0.6
 * date: 2016.09.17
 * updata: 2017.04.22
 * site: http://zwb.io/
 */

// var https = require("https");
// var multicurl = require('multicurl');
// var readline = require('readline');
// var jsdom = require('jsdom');
var fs = require("fs")
const path = require('path')
var request = require('request');
const argv = require('commander')


var Unsplash = require('../lib/source/unsplash')
// dev tools
const Timer = require('../lib/module/timer')
var timer = new Timer()
timer.run()

// init commander
argv.version('0.0.1')
    .usage('[options]')
    .option('-w, --width <lang>', 'picture width')
    .option('-h, --height <lang>', 'picture height')
    .option('-a, --about <lang>', 'keyword: nature,water')
    .option('-o, --original', 'download original picture')
    .option('-i, --id <lang>', 'download specific picture')
    .parse(process.argv)

class FreePic {
  constructor() {
    this.dir = './test'
    this.name = `freepic-${new Date().getTime()}.jpg`
    this.lucky = [
      '🌽', '🍅', '🍓', '🍑', '🐯',
      '🍏', '🍊', '🍭', '🐔' , '🐷']
    this.opts = {
      width: argv.width,
      height: argv.height,
      about: argv.about,
      original: argv.original,
      id: argv.id
    }
  }

  go() {
    let unsplash = new Unsplash(freepic.opts),
        lucky = this.lucky[Math.round(Math.random()*10)]

    console.log(`downloading your luky picture ${lucky}`)
    unsplash
      .getImgURL()
      .then((url, err) => {
        console.log(url)
        // this.name = url.split('?')[0].split('/').pop() + '.jpg'
        freepic.download(url)
      })
  }

  download(url) {
    let self = this
    request(url)
      .on('response', (response) => {
        timer.end()
      })
      .pipe(fs.createWriteStream(path.join(self.dir, self.name)))
      }
}


var freepic = new FreePic()

freepic.go()






// progress(request('https://source.unsplash.com/WLUHO9A_xik/1600x900'), {})
//   .on('progress', (state) => {

//   })
//   .on('end', () => {
//     timer.end()
//   })
//   .pipe(fs.createWriteStream(`./test/freepic-${new Date().getTime()}.png`))



  


/********************** 资源对象 **********************/


// http://jaymantri.com/page/2
// http://www.lifeofpix.com/
// http://www.lifeofpix.com/page/2/
// document.querySelectorAll('.attachment-portfolio-big')

//  var jaymantri = new Promise((resolve, reject) => {
//    jsdom.env({
//      url: 'http://jaymantri.com/',
//      done: function(err, window) {
//        if (err) {
//          reject(err)
//        }

//        let img_class = 'hResPhoto',
//            url_list = [],
//            imgs = window.document.getElementsByClassName(img_class)

//        for (let i = 0; i < imgs.length; i++) {
//          url_list.push(imgs[i].src)
//        }

//        window.close()
//        resolve(url_list)
//      }
//    })
//  })



 // url = upsplash._getUrlList(),
//  var path = './test',
//      imgPath = `./test/freepic-${new Date().getTime()}.jpg`,
//      timeBegin,
//      timeEnd


// 创建本地目录
// my_mkdir(path)
//
// function my_mkdir(path) {
//   try {
//     fs.mkdirSync(path)
//   } catch(e) {
//     if (e.code != 'EEXIST') throw e
//   }
// }

// if (!fs.existsSync(path)) {
//   fs.mkdirSync(path)
// }

// 进程
// var promise = upsplash.getUrlList()

// promise.then(function(value) {
//   timeEnd = Date.now()
//   console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
//   console.log(value)
// }, function(err) {
//   console.log(err)
// })

// jaymantri.then(function(value) {
//   timeEnd = Date.now()
//   console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
//   console.log(value)
// }, function(err) {
//   console.log(err)
// })



// multicurl 下载
// var download = new multicurl('https://source.unsplash.com/daily', {
//   connections: 1,
//   destination: imgPath
// })

// download.on('progress', function(bytesDown, bytesTotal) {
//   console.log(bytesDown / 1000, 'of', bytesTotal / 1000, 'k loaded')
// })

// download.on('done', function() {
//   timeEnd = Date.now()
//   console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
// })

// timeBegin = Date.now()
// console.log('Time begin:', timeBegin)
// download.run()

// FreePic
// class FreePic {
//   constructor(imgURL) {
//     this.url = imgURL
//   }
//   src: 
//   download: () => {
    
//   }
// }
