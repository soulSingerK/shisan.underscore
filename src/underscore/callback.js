import { isFunction, toString } from '../util'

export function _initCallback(underscore) {
  /**
   * 原理：你尽管触发事件，但是我一定在事件触发n秒后才执行，如果你在一个事件触发
   * n秒内又触发了此事件，那我就以新的事件的时间为准，n秒后才执行，总之，就是等你
   * 触发事件n秒后不再触发事件，我才执行
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
   * 原理：如果持续触发事件，每隔一段时间，只执行一次事件
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

  underscore.prototype.type = function(val) {
    const classType = {}
    "Boolean Number String Function Array Date RegExp Object Error".split(' ').map(item => {
      classType[`[object ${item}]`] = item.toLowerCase()
    })
    return typeof val === 'object' || typeof val === 'function' ?
      classType[Object.prototype.toString.call(val)] || "object" :
      typeof val
  }

  underscore.prototype.eq = function(a, b, aStack, bStack) {
    // 为了区分出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b
    
    if (a == null || b == null) return false
  
    // 判断NaN
    if (a !== a) return b !== b
    
    const type = typeof a
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false

    // 复杂的对象使用deepEq 函数进行深度比较
    return deepEq(a, b, aStack, bStack, this.eq)
  }
}

function deepEq(a, b, aStack, bStack, eq) {
  const aTypeName = toString.call(a)
  const bTypeName = toString.call(b)

  if(aTypeName !== bTypeName) return false

  switch(aTypeName) {
    case '[object RegExp]':
    case '[object String]':
      return '' + a === '' + b
    case '[object Number]':
      // 判断转化数字为NaN的
      if (+a !== +a) return +b !== +b 
      return +a === 0 ? 1 / + a === 1 / b : +a === +b
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b
  }

  const isArray = aTypeName === '[object Array]'
  // 不是数组
  if (!isArray) {
    if (typeof a != 'object' || typeof b != 'object') return false
    const aCtor = a.constructor
    const bCtor = b.constructor
    if (
      aCtor !== bCtor &&
      !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) &&
      'constructor' in a && 'constructor' in b
    ) {
      return false
    }
  }
  aStack = aStack || []
  bStack = bStack || []

  let length = aStack.length
  while (length--) {
    if (aStack[length] === a) {
      return bStack[length] === b
    }
  }
  aStack.push(a)
  bStack.push(b)

  if (isArray) {
    length = a.length
    if (length !== b.length) return false
    while (length--) {
      if (!eq(a[length], b[length], aStack, bStack)) return false
    }
  } else {
    const keys = Object.keys(a)
    let key
    length = keys.length

    if (Object.keys(b).length !== length) return false
    while (length--) {
      key = keys[length]
      if (!(b.hasOwnProperty(key) && eq(a[key], b[key], aStack, bStack))) return false
    }
  }
  
  aStack.pop()
  bStack.pop()
  return true
}