import {isObservable, observable} from '@nx-js/observer-util'
import {useMemo} from 'react'
import {computed} from './computed'

/**
 * create a shared store outside components
 * @param obj object contains init state values
 * @param wrapGetterToComputed whether to wrap getters to computed values. default value is true
 */
export function createStore<T extends object>(obj: T, wrapGetterToComputed = true) {
  if (isObservable(obj)) return obj
  if (wrapGetterToComputed) {
    for (const k in obj) {
      if (obj.hasOwnProperty(k)) {
        const d = Object.getOwnPropertyDescriptor(obj, k)
        if (d === undefined) continue
        const getter = d.get
        const setter = d.set
        if (getter) {
          Object.defineProperty(obj, k, {
            get: computed(getter),
            set: setter
          })
        }
      }
    }
  }
  return observable(obj)
}

/**
 * when creating local store inside functional component call this hook instead of createStore to avoid recreation during rendering
 * @param obj object contains init state values
 * @param wrapGetterToComputed whether to wrap getters to computed values. default value is true
 */
export function useLocalStore<T extends object>(obj: T, wrapGetterToComputed = true) {
  return useMemo(() => createStore(obj, wrapGetterToComputed), [])
}
