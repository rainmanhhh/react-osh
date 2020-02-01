import * as React from 'react'
import { store, view } from '../src'
import { useEffect } from 'react'

export let renderTimes = 0
export const CounterStore = store({ count: 0 })

export const Counter = view(function AutoIncrement() {
  useEffect(() => {
    renderTimes++
  })
  return <div>{CounterStore.count}</div>
})
