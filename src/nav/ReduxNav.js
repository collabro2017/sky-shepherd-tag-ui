import React from "react"
import { connect } from "react-redux"
import { addNavigationHelpers } from "react-navigation"
import PropTypes from "prop-types"
import AppNav from "./AppNav"

const mapStateToProps = state => ({
  nav: state.nav
})

const ReduxNav = props => {
  const { dispatch, nav } = props
  const navigation = addNavigationHelpers({ dispatch, state: nav })
  return <AppNav navigation={navigation} />
}

ReduxNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(ReduxNav)
