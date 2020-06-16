const request = require('request')
const PREFIX = 'cdn.stocksnap.io'

class Stocksnap {
  constructor(opts) {
    this.origin = 'https://stocksnap.io'
    this.api = 'https://stocksnap.io/api/load-photos/date/desc/'
    this.searchApi = 'https://stocksnap.io/api/search-photos/girl/relevance/desc/1'
    this.imgId = null
    this.imgURL = ''
    this.original = ''
    this.previewURL = ''
    this.opts = opts
  }

  getImgURL() {
    return new Promise((resolve, reject) => {
      this.getImgId(resolve, reject)
    })
  }

  getImgId(resolve, reject) {
    let randomPage = Math.round(Math.random() * 10),
        requestURl = this.api + randomPage
    
    if (this.opts.about) {
      let keywords = this.opts.about.split(',').join('+')
      requestURl = `https://stocksnap.io/api/search-photos/${keywords}/relevance/desc/1`
    }

    request({
      method: 'GET',
      url: requestURl,
      json: true,
      timeout: 30000
    }, (err, response, body) => {
      if (err) reject(err)
      if (!body || !body.results) {
        reject('stocksnap getImgId error.')
        return
      }
      // id arr
      let imgArr = body.results

      let randomIndex = Math.round(imgArr.length * Math.random()) -1
      this.imgId = imgArr[randomIndex].img_id
      resolve({
        url: this.imgURL,
        original: this.original,
        preview: this.previewURL
      })
    })
  }

  set imgId(id) {
    let downloadApi = `https://${PREFIX}/img-thumbs/960w/`
    this.imgURL = downloadApi + id + '.jpg'
    this.original = this.origin + '/photo/' + id
    this.previewURL = `https://${PREFIX}/img-thumbs/280h/${id}.jpg`
  }
}

module.exports = Stocksnap
