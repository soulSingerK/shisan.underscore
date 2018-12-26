import underscore from './underscore.shisan'

const _ = new underscore()

let count = 1
const container = document.getElementById('container')
function getUserAction() {
  container.innerHTML = count++
  return 1
}
const setUserAction = _.debounce(getUserAction, 100)
container.onmousemove = setUserAction
container.onclick = function() {
  setUserAction.cancel()
}
// container.onmousemove = getUserAction