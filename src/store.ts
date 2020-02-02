import {useMemo} from 'react'
import {observable} from '@nx-js/observer-util'
import {utils} from './utils'

export default function store<T extends object>(obj: T) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (utils.isInsideFunctionalComponent) {
    return useMemo(() => observable(obj), [])
  }
  return observable(obj)
}
