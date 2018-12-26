import underscore from './underscore'

const _ = new underscore()

let count = 1
const container = document.getElementById('container')
// function getUserAction() {
//   container.innerHTML = count++
// }


// const setUserAction = _.debounce(getUserAction, 100)
// container.onmousemove = setUserAction
// container.onclick = function() {
//   setUserAction.cancel()
// }
// container.onmousemove = getUserAction

// container.onmousemove = _.throttle(getUserAction, 1000, { trailing: true, leading: false })

const arr = [1, 2, '1', '2']
console.log(_.unique(arr, false, item => {
  return +item
}))

console.log(_.type(new Error()))