import {observe} from '@nx-js/observer-util'

const computedPlaceHolder = {}

export function computed<T>(getter: () => T) {
  let value = computedPlaceHolder
  // call getter immediately may throw Error when observable object has self-reference, so use placeholder and set lazy to true
  const reaction = observe(getter, {
    lazy: true,
    scheduler: (r: typeof getter) => {
      value = r()
    }
  })
  return function computedValueGetter() {
    // to fix: circle getA() => getB() => getC() => getA()
    if (value === computedPlaceHolder) value = reaction()
    return value
  }
}
