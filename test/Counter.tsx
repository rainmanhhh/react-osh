import * as React from 'react'
import {useEffect} from 'react'
import {createStore, view} from '../src'

export let renderTimes = 0
export let quotientComputeTimes = 0
// export let doubleQuotientComputeTimes = 0
export const cls = {
  counterValue: 'counterValue',
  quotient: 'quotient',
  doubleQuotient: 'doubleQuotient'
}

export const counterStore = createStore({
  count: 0,
  get quotient() {
    quotientComputeTimes++
    return Math.floor(counterStore.count / 3)
  }
  // get doubleQuotient() {
  //   doubleQuotientComputeTimes++
  //   return counterStore.quotient * 2
  // }
})

const Counter = () => {
  useEffect(() => {
    renderTimes++
  })
  return (
    <>
      <div className={cls.counterValue}>
        {cls.counterValue}:{counterStore.count}
      </div>
      <div className={cls.quotient}>
        {cls.quotient}:{counterStore.quotient}
      </div>
      {/*<div className={cls.doubleQuotient}>*/}
      {/*  {cls.doubleQuotient}:{counterStore.doubleQuotient}*/}
      {/*</div>*/}
    </>
  )
}

export default view(Counter)
