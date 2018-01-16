import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import PropTypes from "prop-types"
import styles from "../../styles"

import { mapSelectors, mapOperations } from "../../state/map"

const mapStateToProps = state => {
  const props = {
    lastRegion: mapSelectors.getLastRegion(state),
    region: mapSelectors.getRegion(state),
    mode: mapSelectors.getMode(state),
    mapType: "hybrid",
    provider: PROVIDER_GOOGLE,
    style: styles.map
  }
  return { ...props }
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
    return (
      nextProps.region != this.props.region || nextProps.mode != this.props.mode
    )
  }

  componentWillReceiveProps(newProps) {
    const modeChanged = newProps.mode != this.props.mode
    const isCreateMode = newProps.mode == "create"
    if (modeChanged && isCreateMode) {
      Alert.alert("New area")
    }
  }

  render() {
    const region = this.props.region || this.props.lastRegion
    const props = { ...this.props, region }
    return (
      <View style={{ flex: 1 }}>
        <MapView {...props} />
      </View>
    )
  }
}

Map.propTypes = {
  style: View.propTypes.style,
  lastRegion: MapView.propTypes.region,
  region: MapView.propTypes.region,
  onRegionChangeComplete: MapView.propTypes.onRegionChangeComplete,
  mode: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
