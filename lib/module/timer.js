// Test time consuming
class Timer {
  constructor() {
    this.beginTime = 0
    this.endTime = 0
  }

  run() {
    this.beginTime = process.uptime()
  }

  end() {
    this.endTime = process.uptime()
    this.log()
  }

  log() {
    let duration = (this.endTime - this.beginTime).toFixed(3)
    console.log(`| duration: ${duration} s`)
  }
}

var timer = new Timer()

module.exports = timer
