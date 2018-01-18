// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { isEqual } from "lodash"
import AreaMarker from "./AreaMarker"
import Polygon from "./Polygon"
import { coordinatesFromArea, regionFromArea } from "./area"
import type { Region, State } from "../../state/types"
import type { Area, Coordinate } from "../../data/types"
import styles from "../../styles"

import { mapSelectors, mapOperations } from "../../state/map"
import { areaSelectors } from "../../state/area"

const mapStateToProps = (state: State, ownProps: Props) => {
  const provider: string = PROVIDER_GOOGLE
  return {
    ...ownProps,
    area: mapSelectors.getArea(state),
    areas: areaSelectors.getAreas(state),
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
    saveRegion: function(region: Region) {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

const pickRegion = (props: Props): Region => {
  const { area, lastRegion, mode, region } = props
  switch (mode) {
    case "area":
      if (typeof area !== "undefined" && area !== null) {
        return regionFromArea(area)
      }
    // fallthrough
    default:
      return region || lastRegion
  }
}

class Map extends Component<Props, MapComponentState> {
  constructor(props: Props) {
    super(props)
    const region = pickRegion(this.props)
    this.state = { region }
  }

  // TODO: Make sure "create" mode gets turned off
  componentWillReceiveProps(newProps) {
    const modeChanged = newProps.mode != this.props.mode
    const isCreateMode = newProps.mode == "create"
    if (modeChanged && isCreateMode) {
      Alert.alert("New area")
    }
  }

  componentWillUnmount() {
    this.props.saveRegion(this.state.region)
  }

  shouldComponentUpdate(nextProps: Props) {
    // Only pay attention to props. Allowing state to cause an update
    // doesn't work well, since state updates in response to changes
    // in the map.
    return !isEqual(this.props, nextProps)
  }

  onRegionChangeComplete(region: Region) {
    this.setState({ region })
  }

  render() {
    const { area, areas } = this.props
    const coordinates: Coordinate[] = coordinatesFromArea(area)
    return (
      <View style={{ flex: 1 }}>
        <MapView
          {...this.props}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          initialRegion={this.state.region}
          region={this.state.region}
        >
          {areas.map((a: Area) => <AreaMarker area={a} key={a.id} />)}
          <Polygon coordinates={coordinates} />
        </MapView>
      </View>
    )
  }
}

type Props = {
  area: ?Area,
  areas: Area[],
  lastRegion: Region,
  mode: string,
  saveRegion: (region: Region) => void,
  provider: string,
  region: Region,
  style: View.propTypes.style
}

type MapComponentState = {
  region: Region
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
