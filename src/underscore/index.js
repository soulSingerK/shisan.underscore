import { _initCallback } from './callback'
import { _initArray } from './array'
import { _initFunction } from './function'

function underscore() {
}

_initCallback(underscore)
_initArray(underscore)
_initFunction(underscore)

export default underscore