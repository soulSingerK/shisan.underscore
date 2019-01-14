export function _initArray(underscore) {
  /**
   * 数组去重
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
      if (isSort) { // 如果是已经排序的，只需要判断当前元素与上一个元素是否相同
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

  /**
   * 
   * @param {Object || Array} obj 需要拷贝的对象或数组  
   */
  underscore.prototype.deepCopy = function (obj) {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
      newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key]
    }
    return newObj
  }

  /**
   * 扁平化数组
   * @param {Array} input 要处理的数组 
   * @param {Boolean} shallow 是否只扁平一层
   * @param {Boolean} strict 是否严格处理元素
   * @param {Array} output 
   * 
   * shallow true + strict false: 正常扁平一层
   * shallow false + strict false : 正常扁平所有层
   * shallow true + strict true : 去掉非数组元素
   * shallow fakse + strict true 返回一个 []
   */
  underscore.prototype.flatten = function (input, shallow, strict, output) {
    output = output || []
    let idx = output.length

    for (let i = 0; i < input.length; i++) {
      let value = input[i]
      if (Array.isArray(value)) {
        if (shallow) {
          let j = 0, length = value.length
          while(j < length) output[idx++] = value[j++]
        } else {
          this.flatten(value, shallow, strict, output)
          idx = output.length
        }
      } else if (!strict) {
        output[idx++] = value
      }
    }
    return output
  }
}