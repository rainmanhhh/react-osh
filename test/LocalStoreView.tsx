import {store, view} from '../src'
import * as React from 'react'

export interface LocalStoreType {
  value: number
}

export const storeHolder: {
  store: LocalStoreType
} = {
  store: {value: 0}
}

function LocalStoreView() {
  const s = store({
    value: 0
  })
  storeHolder.store = s
  return <div>{s.value}</div>
}

export default view(LocalStoreView)
