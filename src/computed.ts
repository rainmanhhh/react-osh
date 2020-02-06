import {observe} from '@nx-js/observer-util'

const computedPlaceHolder = {}

/**
 * wrap value provider to computed value getter.
 * a computed value getter will cache provider compute result and re-compute when depended observable values change
 * todo fix circle: getA() => getB() => getC() => getA()
 * @param provider value provider
 */
export function computed<T>(provider: () => T) {
  let value = computedPlaceHolder
  // call getter immediately may throw Error when observable object has self-reference, so use placeholder and set lazy to true
  const reaction = observe(provider, {
    lazy: true,
    scheduler: (r: typeof provider) => {
      value = r()
    }
  })
  return function computedValueGetter(): T {
    if (value === computedPlaceHolder) value = reaction()
    return value as T
  }
}
