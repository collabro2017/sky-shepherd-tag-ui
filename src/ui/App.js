/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Dimensions } from "react-native"
import { Provider } from "react-redux"
import Home from "./Home"
import { configureStore } from "../state"

const calculateLongitudeDelta = latitudeDelta => {
  const { width, height } = Dimensions.get("window")
  return latitudeDelta * width / height
}

const defaultLatitudeDelta = 0.00922
const defaultRegion = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

const store = configureStore({ map: { region: defaultRegion } })

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}
