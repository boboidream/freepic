const request = require('request')

class Stocksnap {
  constructor() {
    this.origin = 'https://stocksnap.io'
    this.api = 'https://stocksnap.io/api/load-photos/date/desc/'
    this.imgId = null
    this.imgURL = ''
    this.original = ''
  }

  getImgURL() {
    return new Promise((resolve, reject) => {
      this.getImgId(resolve, reject)
    })
  }

  getImgId(resolve, reject) {
    let randomPage = Math.round(Math.random() * 10)

    request({
      method: 'GET',
      url: this.api + randomPage,
      json: true
    }, (err, response, body) => {
      if (err) reject(err)
      // id arr
      let imgArr = body.results

      if (!imgArr) {
        reject('stocksnap getImgId error.')
        return
      }

      let randomIndex = Math.round(imgArr.length * Math.random()) -1
      this.imgId = imgArr[randomIndex].img_id
      resolve({
        url: this.imgURL,
        original: this.original
      })
    })
  }

  set imgId(id) {
    let downloadApi = 'https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/'
    this.imgURL = downloadApi + id + '.jpg'
    this.original = this.origin + '/photo/' + id
  }
}

module.exports = Stocksnap
