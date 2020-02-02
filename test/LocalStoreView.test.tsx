import {mount} from 'enzyme'
import * as React from 'react'
import LocalStoreView, {LocalStoreType, storeHolder} from './LocalStoreView'
import {act} from 'react-dom/test-utils'
import {StrictMode} from 'react'

describe('LocalStoreView', function() {
  const wrapper = mount(
    <StrictMode>
      <LocalStoreView />
    </StrictMode>
  )
  let firstStore: LocalStoreType = {value: 0}
  it(`should render '0' at start`, function() {
    expect(wrapper.first().text()).toEqual('0')
    firstStore = storeHolder.store
  })
  it(`should render '1' after change(local store should not be recreated)`, function() {
    act(() => {
      storeHolder.store.value = 1
    })
    expect(wrapper.first().text()).toEqual('1')
    expect(firstStore).toBe(storeHolder.store)
  })
})
