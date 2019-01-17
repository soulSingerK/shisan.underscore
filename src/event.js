export class Event {
  events = {}
  constructor() {
  }

  on(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  }

  trigger(eventName) {
    if(!this.events[eventName] || !this.events[eventName].length) return
    this.events[eventName].forEach(item => {
      item()
    })
  }

  remove(eventName, fn) {
    if(!this.events[eventName] || !this.events[eventName].length) return
    const index = this.events[eventName].findIndex(v => v === fn)
    index > -1 && this.events[eventName].splice(index, 1)
  }
}