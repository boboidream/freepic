/*
 * title: free-pic
 * author: bobo
 * version: 0.0.5
 * date: 2016.09.17
 * site: http://zwb.io/
 */

 var https = require("https");
 var multicurl = require('multicurl');
 // var cheerio = require('cheerio');
 var fs = require("fs");
 var readline = require('readline');
 var jsdom = require('jsdom');

/********************** 资源对象 **********************/
 var upsplash = {
   _url: 'https://unsplash.com',
   getUrlList: function() {
     return new Promise((resolve, reject) => {
       let img_class = 'cV68d',
           url_list = []

      jsdom.env({
        url: this._url,
        // scripts: ["http://code.jquery.com/jquery.js"],
        done: function(err, window) {
          if (err) {
            reject(err)
          }

          let imgs = window.document.getElementsByClassName(img_class),
              pattern = /url\((.*)\?/,
              imgs_array = [].slice.call(imgs, 0)

          imgs_array.map(item => {
            url_list.push(item.style.backgroundImage.match(pattern)[1])
          })

          window.close()
          resolve(url_list)
        }
      })

     })
   }
 }

// http://jaymantri.com/page/2
// http://www.lifeofpix.com/
// http://www.lifeofpix.com/page/2/
// document.querySelectorAll('.attachment-portfolio-big')
 var jaymantri = new Promise((resolve, reject) => {
   jsdom.env({
     url: 'http://jaymantri.com/',
     done: function(err, window) {
       if (err) {
         reject(err)
       }

       let img_class = 'hResPhoto',
           url_list = [],
           imgs = window.document.getElementsByClassName(img_class)

       for (let i = 0; i < imgs.length; i++) {
         url_list.push(imgs[i].src)
       }

       window.close()
       resolve(url_list)
     }
   })
 })



 // url = upsplash._getUrlList(),
 var path = './test',
     imgPath = './test/test.jpg',
     timeBegin,
     timeEnd


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

if (!fs.existsSync(path)) {
  fs.mkdirSync(path)
}

// 进程
// var promise = upsplash.getUrlList()
//
// promise.then(function(value) {
//   timeEnd = Date.now()
//   console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
//   console.log(value)
// }, function(err) {
//   console.log(err)
// })

jaymantri.then(function(value) {
  timeEnd = Date.now()
  console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
  console.log(value)
}, function(err) {
  console.log(err)
})

// 原生下载
// timeBegin = Date.now()
// console.log('Time begin:', timeBegin)
// downloadPic('https://images.unsplash.com/photo-1474204075013-fafcfee9bfd7', imgPath)

// function downloadPic(url, imgPath) {
//   https.get(url, function(res) {
//     console.log(url)
//     let imgData = ''
//
//     res.setEncoding('binary')
//
//     res.on('data', function(chunk) {
//       imgData += chunk
//     })
//
//     res.on('end', function() {
//       fs.writeFile(imgPath, imgData, 'binary', function(err) {
//         if (err) {
//           console.log(err)
//         }
//
//         timeEnd = Date.now()
//         console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
//        //  console.log('\x1b[36m%s\x1b[0m', `download pic success!`);
//       })
//     })
//   })
// }

// multicurl 下载
var download = new multicurl('https://images.unsplash.com/photo-1474204075013-fafcfee9bfd7', {
  connections: 3,
  destination: imgPath
})

download.on('progress', function(bytesDown, bytesTotal) {
  console.log(bytesDown / 1000, 'of', bytesTotal / 1000, 'k loaded')
})

download.on('done', function() {
  timeEnd = Date.now()
  console.log('Time end:', timeEnd, 'all:', (timeEnd - timeBegin) / 1000)
})

timeBegin = Date.now()
console.log('Time begin:', timeBegin)
// download.run()
