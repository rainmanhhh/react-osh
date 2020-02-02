import * as React from 'react'
import {store, view} from '../src'
import {useEffect} from 'react'

export let renderTimes = 0
export const CounterStore = store({count: 0})

const Counter = () => {
  useEffect(() => {
    renderTimes++
  })
  return <div>{CounterStore.count}</div>
}

export default view(Counter)
