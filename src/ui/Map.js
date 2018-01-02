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
    onLongPress: () => dispatch(mapOperations.createBoundary()),
    onRegionChangeComplete: function(region) {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

class Map extends Component {
  // Only update if the region or mode changes. Otherwise we get jitter from recording
  // region updates
  shouldComponentUpdate(nextProps) {
    if (
      nextProps.region != this.props.region ||
      nextProps.mode != this.props.mode
    ) {
      return true
    } else {
      return false
    }
  }
  componentWillReceiveProps(newProps) {
    console.log({ received: newProps })
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
  lastRegion: MapView.propTypes.initialRegion,
  region: MapView.propTypes.initialRegion,
  onRegionChange: MapView.propTypes.onRegionChange,
  mode: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
