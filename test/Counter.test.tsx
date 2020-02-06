import * as React from 'react'
import {StrictMode} from 'react'
import {act} from 'react-dom/test-utils'
import Counter, {cls, counterStore, renderTimes} from './Counter'
import {mount} from 'enzyme'

const cs = counterStore
let expectedCounterValue = 1
let expectedQuotient = 0
let expectedQuotientComputeTimes = 0
// let expectedDoubleQuotient = 0
// let expectedDoubleQuotientComputeTimes = 0
let expectedRenderTimes = 0

cs.count = expectedCounterValue

describe('Counter', function() {
  const wrapper = mount(
    <StrictMode>
      <Counter />
    </StrictMode>
  )

  function makeTest<T>(action?: () => T) {
    const counterValueString = cls.counterValue + ':' + expectedCounterValue
    const quotientString = cls.quotient + ':' + expectedQuotient
    // const doubleQuotientString = cls.doubleQuotient + ':' + expectedDoubleQuotient.toString()
    const eRenderTimes = expectedRenderTimes
    return function() {
      if (action)
        act(() => {
          action()
        })
      expect(wrapper.find('.' + cls.counterValue).text()).toEqual(counterValueString)
      expect(wrapper.find('.' + cls.quotient).text()).toEqual(quotientString)
      // expect(wrapper.find('.' + cls.doubleQuotient).text()).toEqual(doubleQuotientString)
      expect(renderTimes).toEqual(eRenderTimes)
    }
  }

  function prepare(actionName: string, prepareAction: () => void) {
    prepareAction()
    return `should render ['${expectedCounterValue}', '${expectedQuotient}'] 
    ${actionName}(renderCount: ${expectedRenderTimes}, quotientComputeTimes: ${expectedQuotientComputeTimes})`
  }

  it(
    `${prepare('at start', () => {
      expectedRenderTimes++ // 1
      expectedQuotientComputeTimes++ // 1
      // expectedDoubleQuotientComputeTimes++ // 1
    })}`,
    makeTest()
  )

  it(
    `${prepare('after value++', () => {
      expectedCounterValue++ // 2
      expectedRenderTimes++ // 2
      expectedQuotientComputeTimes++ // 2
    })}`,
    makeTest(() => cs.count++)
  )

  it(
    `${prepare('after value++ twice', () => {
      expectedCounterValue += 2 // 4
      expectedQuotient++ // 1
      // expectedDoubleQuotient += 2 // 2
      expectedRenderTimes++ // 3
      expectedQuotientComputeTimes++ // 3
      // expectedDoubleQuotientComputeTimes++ // 2
    })}`,
    makeTest(() => {
      cs.count++
      cs.count++
    })
  )

  it(
    `${prepare('after value++ and value--', () => {
      expectedRenderTimes++ // 4
    })}`,
    makeTest(() => {
      cs.count++
      cs.count--
    })
  )
})
