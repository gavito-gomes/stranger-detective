const Timer = function (callback, delay) {
  var timerId,
    start,
    remaining = delay

  this.pause = function () {
    clearTimeout(timerId)
    remaining -= Date.now() - start
    console.log('Timer paused! Remaining: ' + remaining)
  }

  this.resume = function () {
    start = Date.now()
    clearTimeout(timerId)
    timerId = setTimeout(callback, remaining)
    console.log('Timer resumed! Remaining: ' + remaining)
  }

  this.clear = function () {
    clearTimeout(timerId)
    remaining = delay
  }

  this.resume()
}

export default Timer
