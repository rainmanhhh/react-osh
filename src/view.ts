import {FC, useCallback, useEffect, useMemo, useState} from 'react'
import {observe, unobserve} from '@nx-js/observer-util'

export function view<T>(Comp: FC<T>): FC<T> {
  // use a hook based reactive wrapper when we can
  const ReactiveComp = (props: T) => {
    // use a dummy setState to update the component
    const [, setState] = useState()
    const forceUpdate = useCallback(() => setState({}), [])

    // create a memoized reactive wrapper of the original component (render)
    // at the very first run of the component function
    const render = useMemo(
      () =>
        observe(Comp, {
          scheduler: forceUpdate,
          lazy: true
        }),
      [Comp]
    )

    // cleanup the reactive connections after the very last render of the component
    useEffect(() => () => unobserve(render), [])

    // run the reactive render instead of the original one
    return render(props)
  }

  ReactiveComp.displayName = Comp.displayName || Comp.name

  return ReactiveComp
}
