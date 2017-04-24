class FeConsole {
  constructor(opts) {
    this.opts = this.dealOpt(opts)
    this.prefix = this.opts.prefix
  }

  dealOpt(opts) {
    let defaultOpts = {
      prefix: '| '
    }
    return Object.assign(defaultOpts, opts)
  }

  log() {
    let argvArr = Array.prototype.splice.call(arguments, 0),
        res = ''

    argvArr.forEach(content =>{
      res += (this.prefix + content + '\n')
    })

    console.log(res)
  }

}

module.exports = new FeConsole()
