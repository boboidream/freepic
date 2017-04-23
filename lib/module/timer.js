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
    console.log(`duration: ${this.endTime - this.beginTime} s`)
  }
}

module.exports = Timer
