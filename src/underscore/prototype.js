
export function _initPrototype(underscore) {
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
  
  /**
   * 
   * @param {*} func 
   * @param {*} wait 
   * @param {Object} options
   * options两个设置
   * leading 表示事件触发时回调是否立即执行回调一次 
   * trailing 表示事件结束时是否再调用一次回调
   */
  underscore.prototype.throttle = function(func, wait, options) {
    let timeout, result
    let previous = 0
    options = options || {}
    const later = (...args) => {
      previous = options.leading === false ? 0 : Date.now()
      func.apply(this, args)
      if (!timeout) args = null
    }
  
    const throttled = (...args) => {
      const now = Date.now()
      if (!previous && options.leading === false) previous = now
      const remaining = wait - ( now - previous )
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout)
          timeout = null
        }
        previous = now
        result = func.apply(this, args)
        if (!timeout) args = null
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining)
      }
    }
    throttled.cancel = function() {
      clearTimeout(timeout)
      previous = 0
      timeout = null
    }
    return throttled
  }
}