# Archieved
please use vue3 reactive/ref instead

# react-osh
![CI](https://github.com/rainmanhhh/react-osh/workflows/CI/badge.svg)
![Codecov](https://img.shields.io/codecov/c/gh/rainmanhhh/react-osh)
![npm](https://img.shields.io/npm/v/react-osh)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-osh)
![David](https://img.shields.io/david/rainmanhhh/react-osh)
![npm](https://img.shields.io/npm/dm/react-osh)
![NPM](https://img.shields.io/npm/l/react-osh)

simple react state manager based on observer-util. 'osh' means **O**bservable **S**tate-manager with **H**ooks

react-state-easy seems to be not maintained anymore, so I create this one instead.

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Limitation](#limitation)

## Introduction
react-osh is based on @nx-js/observer-util. it provides below apis: 
- `createStore` for creating global shared store
- `useLocalStore` for creating local store inside functional component
- `view` for wrapping components to make them observe store changes
- `computed` for wrapping a function to computed value getter. similar to `React.useMemo` but don't need to specific dependencies manually and can be used outside components

## Installation

`npm install react-osh`

or

`yarn add react-osh`

## Usage:
```jsx harmony
import * as React from 'react'
import {createStore, useLocalStore, view} from 'react-osh'

const shared = createStore({
  value: 1,
  /**
   * this is a getter and will be auto wrapped to a 'computed value'(re-compute only when shared.value is changed)
   */
  get double() {
    return shared.value * 2
  },
  nested: {
    value: 'foo'
  },
  reset() {
    shared.value = Math.random()
  }
})

/**
 * set second argument to false means don't wrap getters to computed values.
 * these getters will be called during every render
 */
const rawGetters = createStore({
  get opposite() {
    return -shared.value
  }  
}, false)

export const FooComp = view(function FooComp() {
  const local = useLocalStore({
    count: 0,
    incr() {
      local.count++
    }
  })
  return (
    <div>
      <div>shared.value: {shared.value}</div>
      <div>opposite: {rawGetters.opposite}</div>
      <div>shared.double: {shared.double}</div>
      <div>shared.nested.value: {shared.nested.value}</div>
      <button onClick={shared.reset}>reset shared.value</button>
      <div>local.count: {local.count}</div>
      <button onClick={local.incr}>increase local.count</button>
    </div>
  )
})
```

## Limitation
- ONLY SUPPORT Functional Component.
- based on es6 Proxy so don't support IE
- can't use a computed value inside another
