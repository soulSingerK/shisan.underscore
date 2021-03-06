export const toString = Object.prototype.toString
export const slice = Array.prototype.slice

export function isFunction(obj) {
  return toString.call(obj) === '[object Function]'
}

export function hasOwn(obj, key) {
  return obj.hasOwnProperty(key)
}