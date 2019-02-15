import { hasOwn } from './../util'

export class Observer {
  constructor(data) {
    this.data = data
    this.notify()
  }
  
  notify() {
    for (let key in this.data) {
      const value = this.data[key]
      this.defineProperties(this.data, key, value)
    }
  }

  defineProperties(obj, key, value) {
    const descrptor = Object.getOwnPropertyDescriptor(obj, key)
    const setter = descrptor.set
    const getter = descrptor.get
    console.log(setter, getter)

    Object.defineProperty(obj, key, {
      get: function getter1() {
        if (!getter) {
          return value
        }
        return getter.call(obj)
      },
      set: function setter(newValue) {
        value = newValue
      }
    })
  }
}

export function observer(data) {
  if (hasOwn(data, '__ob__')) return
  new Observer(data)
}

