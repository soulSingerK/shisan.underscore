function underscore() {}

/**
 * 
 * @param {Function} func 
 * @param {Int} wait 
 * @param {Boolean} immediate // 是否立即执行一次 
 */
underscore.prototype.debounce = function(func, wait, immediate) {
  let timeout
  let result // 只在immediate 为true 时才会有返回值
  let debounced = function (...args) {
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(this, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
export default underscore