/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { Dimensions } from "react-native"
import { addNavigationHelpers } from "react-navigation"
import { PropTypes } from "prop-types"
import { Provider, connect } from "react-redux"
import Drawer from "./Drawer"
import { configureStore } from "../state"
import { mapModes } from "../state/reducers/map"

// Setup Reactotron for debugging in dev mode
import setupReactotron from "../utils/reactotronSetup"
setupReactotron()

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

// TODO: Prefer to load last region from storage instead or current location, if available,
// instead of using a default region
const store = configureStore({
  map: { region: defaultRegion, mode: mapModes.VIEW_MODE }
})

const mapStateToProps = state => ({
  nav: state.nav
})

class App extends Component {
  render() {
    return (
      <Drawer
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

const AppWithNavigationState = connect(mapStateToProps)(App)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}

export default Root
