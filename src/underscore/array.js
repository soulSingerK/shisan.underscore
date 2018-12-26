export function _initArray(underscore) {
  /**
   * 
   * @param {Array} arr 
   * @param {Boolean} isSort 数组是否有序 
   * @param {Function} iteratee 对数组的每一项进行处理 
   */
  underscore.prototype.unique = function (arr, isSort, iteratee) {
    const res = []
    let seen

    for (let i = 0; i < arr.length; i++) {
      let value = arr[i]
      let computed = iteratee ? iteratee(value, i, arr) : value
      if (isSort) {
        if (!i || seen !== computed) {
          res.push(computed)
        }
        seen = computed
      } else {
        if (res.indexOf(computed) === -1) {
          res.push(computed)
        }
      }
    }
    return res
  }
}