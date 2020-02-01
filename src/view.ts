import { FC, useState, useEffect, useMemo, memo, useCallback } from 'react'
import { observe, unobserve } from '@nx-js/observer-util'

export let isInsideFunctionComponent = false

export default function view<T>(Comp: FC<T>) {
  // use a hook based reactive wrapper when we can
  const ReactiveComp = memo((props: T) => {
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

    // the isInsideFunctionComponent flag is used to toggle `store` behavior
    // based on where it was called from
    isInsideFunctionComponent = true
    try {
      // run the reactive render instead of the original one
      return render(props)
    } finally {
      isInsideFunctionComponent = false
    }
  })

  ReactiveComp.displayName = Comp.displayName || Comp.name

  // copy static props for function components
  // const rc = ReactiveComp as any
  // const c = Comp as any
  // for (const key of Object.keys(c)) {
  //   rc[key] = c[key]
  // }

  return ReactiveComp
}
