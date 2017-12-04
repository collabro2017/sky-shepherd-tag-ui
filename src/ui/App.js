/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
} from 'react-native';
import { Provider } from 'react-redux'
import Home from './Home'
import { configureStore } from '../state'

const store = configureStore()

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}
