import React, { StrictMode } from 'react'
import { act } from 'react-dom/test-utils'
import { Counter, CounterStore, renderTimes } from './Counter'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const cs = CounterStore
let expectedCounterValue = 1
let expectedRenderTimes = 0
cs.count = expectedCounterValue

describe('Counter', function TestCounter() {
  const wrapper = mount(
    <StrictMode>
      <Counter />
    </StrictMode>
  )

  function makeTest<T>(action?: () => T) {
    const counterValueString = expectedCounterValue.toString()
    const eRenderTimes = expectedRenderTimes
    return function() {
      if (action)
        act(() => {
          action()
        })
      expect(wrapper.first().text()).toEqual(counterValueString)
      expect(renderTimes).toEqual(eRenderTimes)
    }
  }

  it(`should render '${expectedCounterValue}' at start(renderCount: ${++expectedRenderTimes})`, makeTest())

  it(
    `should render '${++expectedCounterValue}' after 1 increment(renderCount: ${++expectedRenderTimes})`,
    makeTest(() => cs.count++)
  )

  it(
    `should render '${(expectedCounterValue += 2)}' after 2 increments(renderCount: ${++expectedRenderTimes})`,
    makeTest(() => {
      cs.count++
      cs.count++
    })
  )

  it(
    `should render '${expectedCounterValue}' after 1 increment and 1 decrement(renderCount: ${++expectedRenderTimes})`,
    makeTest(() => {
      cs.count++
      cs.count--
    })
  )
})
