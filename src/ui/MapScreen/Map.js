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
import { areaSelectors } from "../../state/area"

const mapStateToProps = (state: State, ownProps: Props) => {
  const provider: string = PROVIDER_GOOGLE
  return {
    ...ownProps,
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
  const { area, lastRegion, region } = props
  if (area) {
    return regionFromArea(area)
  } else if (region) {
    return region
  } else {
    return lastRegion
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

  onRegionChangeComplete(region: Region) {
    this.setState({ region })
  }

  render() {
    const { area, areas } = this.props
    const coordinates: Coordinate[] = coordinatesFromArea(area)
    const props = { ...this.props, region: this.state.region }
    return (
      <View style={{ flex: 1 }}>
        <MapView {...props}>
          {areas.map((a: Area) => <AreaMarker area={a} key={a.id} />)}
          <Polygon coordinates={coordinates} />
        </MapView>
      </View>
    )
  }
}

type Props = {
  area: Area,
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
