const Unsplash = require('../source/unsplash')
const Stocksnap = require('../source/stocksnap')

function choseSrc(opts) {
  let resArr = []
  
  if (!opts.width && !opts.height) {
    resArr = [new Unsplash(opts).getImgURL(), new Stocksnap(opts).getImgURL()]
  } else {
    resArr = [new Unsplash(opts).getImgURL()]
  }

  return Promise.race(resArr)
}

module.exports = choseSrc
