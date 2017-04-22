const _ = require('lodash')

class Source {
  constructor(opts) {
    this.defaultOpts = {
      width: null,
      height: null,
      about: null,
      original: null,
      id: null
    }
    this.opts = _.extend(this.defaultOpts, opts)
  }
  done(cb) {
    cb()
  }
  fail() {

  }

  parseURL(url) {
    let urlArr = url.split('?')
    let urlObj = {
      origin: urlArr[0],
      search: {},
      create: () => {
        let originURL = urlObj.origin + '?'

        _.each(urlObj.search, (val, key) => {
          if (val) {
            originURL += `${key}=${val}&`
          }
        })

        if (originURL.slice(-1) === '&') {
          originURL = originURL.substring(0, originURL.length - 1)
        }

        return originURL
      }
    }

    urlArr[1].split('&').forEach((item)=> {
      let arr = item.split('=')
      urlObj[arr[0]] = arr[1]
    })

    return urlObj
  }
}

module.exports = Source
