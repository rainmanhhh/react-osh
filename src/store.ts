import { useMemo } from 'react'
import { observable } from '@nx-js/observer-util'
import { isInsideFunctionComponent } from './view'

export default function store<T extends {}>(obj: T) {
  // do not create new versions of the store on every render
  // if it is a local store in a function component
  // create a memoized store at the first call instead
  if (isInsideFunctionComponent) {
    return useMemo(() => observable(obj), [])
  }
  return observable(obj)
}
