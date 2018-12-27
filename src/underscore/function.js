import { slice } from '../util'

export function _initFunction(underscore) {
  underscore.prototype.curry = function(fn, length) {
    length = length || fn.length
    const context = this
    return function() {
      if (arguments.length < length) {
        const combined = [fn].concat(slice.call(arguments))
        return context.curry(sub_curry.apply(this, combined), length - arguments.length)
      } else {
        return fn.apply(this, arguments)
      }
    }
  }
  function sub_curry(fn) {
    const args = slice.call(arguments, 1)
    return function () {
      return fn.apply(this, args.concat([].slice.call(arguments)))
    }
  }
}