const Unsplash = require('../source/unsplash')
const Stocksnap = require('../source/stocksnap')

function choseSrc(opts) {
  let resArr = []
  
  if (!opts.width && !opts.height) {
    resArr = [new Unsplash(opts).getImgURL(), new Stocksnap(opts).getImgURL()]
  } else {
    resArr = [new Unsplash(opts).getImgURL()]
  }

  return raceSucess(resArr)
}

function raceSucess(promiseArr) {
  return new Promise(resolve => {
    promiseArr.forEach(promise => {
      promise.then(resolve).catch(err => {
        // console.log(err) //print error
      })
    })
  })
}

module.exports = choseSrc
