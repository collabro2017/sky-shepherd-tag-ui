/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react"
import { addNavigationHelpers } from "react-navigation"
import { PersistGate } from "redux-persist/es/integration/react"
import { PropTypes } from "prop-types"
import { Provider, connect } from "react-redux"
import Drawer from "./Drawer"
import { configureStore } from "../state"

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

const { store, persistor } = configureStore()

class Root extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    )
  }
}

export default Root
