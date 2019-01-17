import underscore from './underscore'
import { Event } from './event'

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
const arr1 = [1, 2, '1', '2']

console.log(_.unique(arr, false, item => {
  return +item
}))

console.log(_.deepCopy([{name: 123, age: 22}]))

const flatten = [1, 2, [3, 4, [4, 5, [6, 7]]], {name: 123}]
console.log(_.flatten(flatten, true, false))

console.log(`eq: ${_.eq(arr, arr1)}`)
console.log(`eq: ${_.eq(-0, +0)}`)
console.log(`eq: ${_.eq({name: '1'}, {name: 1})}`)



const arrCurry = _.curry(function(a, b, c) {
  return [a, b, c]
})

// console.log(arrCurry(1, 2, 3))
console.log(arrCurry(1)(2)(3))
console.log(arrCurry(1))
// console.log(arrCurry(1, 2)(3))


const event = new Event()

event.on('test', () => {
  console.log('custom event test')
})

event.trigger('test')