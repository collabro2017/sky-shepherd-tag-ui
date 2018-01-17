// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import AreaMarker from "./AreaMarker"
import Polygon from "./Polygon"
import { coordinatesFromArea, regionFromArea } from "./area"
import type { Region, State } from "../../state/types"
import type { Area, Coordinate } from "../../data/types"
import styles from "../../styles"

import { mapSelectors, mapOperations } from "../../state/map"

const mapStateToProps = (state: State, ownProps: Props) => {
  const provider: string = PROVIDER_GOOGLE
  return {
    ...ownProps,
    lastRegion: mapSelectors.getLastRegion(state),
    region: mapSelectors.getRegion(state),
    mode: mapSelectors.getMode(state),
    mapType: "hybrid",
    provider: provider,
    style: styles.map
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLongPress: () => dispatch(mapOperations.createBoundary()),
    onRegionChangeComplete: function(region) {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

const pickRegion = (props: Props): Region => {
  const { area, lastRegion, region } = props
  if (area) {
    return regionFromArea(area)
  } else if (region) {
    return region
  } else {
    return lastRegion
  }
}

class Map extends Component<Props> {
  // Only update if the region or mode changes. Otherwise we get jitter from recording
  // region updates
  shouldComponentUpdate(nextProps: Props) {
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
    const region = pickRegion(this.props)
    const props: Props = { ...this.props, region }
    const { area } = props
    const coordinates: Coordinate[] = coordinatesFromArea(area)
    return (
      <View style={{ flex: 1 }}>
        <MapView {...props}>
          <AreaMarker area={area} />
          <Polygon coordinates={coordinates} />
        </MapView>
      </View>
    )
  }
}

type Props = {
  area: Area,
  lastRegion: Region,
  mode: string,
  onRegionChangeComplete: MapView.propTypes.onRegionChangeComplete,
  provider: string,
  region: Region,
  style: View.propTypes.style
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
