import underscore from './underscore.shisan'

const _ = new underscore()

let count = 1
const container = document.getElementById('container')
function getUserAction() {
  container.innerHTML = count++
}


// const setUserAction = _.debounce(getUserAction, 100)
// container.onmousemove = setUserAction
// container.onclick = function() {
//   setUserAction.cancel()
// }
// container.onmousemove = getUserAction

container.onmousemove = _.throttle(getUserAction, 1000, { trailing: true, leading: false })