const request = require('request')
const Source = require('./source')

class Unsplash extends Source {
  constructor(opts) {
    super(opts)
    this.origin = 'https://source.unsplash.com/'
  }

  getImgURL() {
    let opts = this.opts
    return new Promise((resolve, reject) => {
      if (opts.id) {
        let url = this.dealURL(this.origin + opts.id)
        resolve(url)
      } else {
        this.requestURL(resolve, reject)
      }
    })
  }

  requestURL(resolve, reject) {
    let about = this.opts.about ? `1080x720/?${this.opts.about}` : 'random'
    let url = this.origin + about
    let self = this

    request({
      method: 'GET',
      url: url,
      followRedirect: false
    }, (error, response, body) => {
      // response.statusCode: 302
      resolve(self.dealURL(response.headers.location))
    })
  }

  dealURL(url) {
    let urlObj = this.parseURL(url)
    if (this.opts.original) {
      return urlObj.origin
    }

    if (this.opts.width && this.opts.height) {
      urlObj.search.w = this.opts.width
      urlObj.search.h = this.opts.height
      urlObj.search.fit = 'crop'
      return urlObj.create()
    } else if (this.opts.width || this.opts.height) {
      urlObj.search.w = this.opts.width
      urlObj.search.h = this.opts.height
      urlObj.search.fit = 'max'
      return urlObj.create()
    } else {
      return url
    }
  }

}


 module.exports = Unsplash
