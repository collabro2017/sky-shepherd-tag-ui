// @flow

import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import PropTypes from "prop-types"
import styles from "../styles"
import console from "reactotron-react-native"

import { mapSelectors, mapOperations, mapModes } from "../state/reducers/map"

const onLayout = props => {
  return () => {
    console.log({ event: "layout", region: props.region })
  }
}

const mapStateToProps = state => {
  const region = mapSelectors.getRegion(state)
  const mode = mapSelectors.getMode(state)
  const props = {
    region,
    mode,
    mapType: "hybrid",
    provider: PROVIDER_GOOGLE,
    style: styles.map
  }
  return { ...props, onLayout: onLayout(props) }
}

const mapDispatchToProps = dispatch => {
  return {
    onLongPress: () => dispatch(mapOperations.createBoundary())
  }
}

class Map extends Component {
  componentWillReceiveProps(newProps) {
    const modeChanged = newProps.mode != this.props.mode
    const isCreateMode = newProps.mode == mapModes.CREATE_MODE
    if (modeChanged && isCreateMode) {
      Alert.alert("New area")
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView {...this.props} />
      </View>
    )
  }
}

Map.propTypes = {
  style: View.propTypes.style,
  region: MapView.propTypes.initialRegion,
  mode: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
