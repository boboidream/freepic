const Unsplash = require('../source/unsplash')
const Stocksnap = require('../source/stocksnap')

function choseSrc(opts) {
  let resArr = []
  
  if (!opts.width && !opts.height) {
    resArr = [new Unsplash().getImgURL(), new Stocksnap().getImgURL()]
  } else {
    resArr = [new Unsplash().getImgURL()]
  }

  return Promise.race(resArr)
}

module.exports = choseSrc
