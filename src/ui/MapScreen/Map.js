// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, InteractionManager, View } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { isEqual } from "lodash"
import Polygon from "./Polygon"
import { coordinatesFromArea, regionFromArea } from "./area"
import {
  defaultLatitudeDelta,
  mapSelectors,
  mapOperations
} from "../../state/map"
import { areaSelectors } from "../../state/area"
import styles, { colors } from "../../styles"
import { calculateLongitudeDelta } from "../../utils/map"

import type { Dispatch, Region, State } from "../../state/types"
import type { Area, Coordinate, Tag } from "../../data/types"

type MapViewType = {
  animateToRegion: (region: Region) => void
}

const mapStateToProps = (state: State, ownProps: Props) => {
  const provider: string = PROVIDER_GOOGLE
  return {
    ...ownProps,
    area: mapSelectors.getArea(state),
    areas: areaSelectors.getAreas(state),
    lastRegion: mapSelectors.getLastRegion(state),
    mode: mapSelectors.getMode(state),
    mapType: "hybrid",
    provider: provider,
    style: styles.map,
    tag: mapSelectors.getTag(state)
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLongPress: () => dispatch(mapOperations.createBoundary()),
    saveRegion: function(region: Region) {
      dispatch(mapOperations.regionChanged(region))
    }
  }
}

// For now, just pick default deltas
const regionFromTag = (tag: Tag): Region => {
  const { latitude, longitude } = tag.position
  return {
    latitude,
    longitude,
    latitudeDelta: defaultLatitudeDelta,
    longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
  }
}

const pickRegion = (props: Props): Region => {
  const { area, lastRegion, mode, tag } = props
  switch (mode) {
    case "area":
      if (area != null) {
        return regionFromArea(area)
      }
    // fallthrough
    case "tag":
      if (tag != null) {
        return regionFromTag(tag)
      }
    // fallthrough
    default:
      return lastRegion
  }
}

type AreaHandler = Area => () => void
const onMarkerPress = (map: Map): AreaHandler => {
  return (area: Area) => {
    return () => {
      map.setState({ area })
      // Ensure the animation doesn't get swallowed by re-render
      InteractionManager.runAfterInteractions(() => {
        const region = regionFromArea(area)
        const mapView = map._map
        if (mapView != null) {
          mapView.animateToRegion(region)
        }
      })
    }
  }
}

type RegionHandler = Region => void
const onRegionChangeComplete = (map: Map): RegionHandler => {
  return (region: Region) => {
    map.setState({ region })
  }
}

class Map extends Component<Props, MapComponentState> {
  _map: ?MapViewType
  _onRegionChangeComplete: RegionHandler
  _onMarkerPress: AreaHandler

  constructor(props: Props) {
    super(props)
    const region = pickRegion(this.props)
    this.state = { area: props.area, region }
    this._onMarkerPress = onMarkerPress(this)
    this._onRegionChangeComplete = onRegionChangeComplete(this)
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

  shouldComponentUpdate(
    nextProps: Props,
    nextState: MapComponentState
  ): boolean {
    // Ignore the region held in state, since state updates in response to changes
    // in the map.
    const shouldUpdate =
      !isEqual(this.props, nextProps) ||
      !isEqual(this.state.area, nextState.area)
    return shouldUpdate
  }

  render() {
    const { areas, tag } = this.props
    const { area } = this.state
    const coordinates: Coordinate[] = coordinatesFromArea(area)
    return (
      <View style={{ flex: 1 }}>
        <MapView
          {...this.props}
          initialRegion={this.state.region}
          onRegionChangeComplete={this._onRegionChangeComplete}
          ref={(ref: ?MapViewType) => (this._map = ref)}
          region={this.state.region}
        >
          {areas.map((a: Area) => (
            <Marker
              coordinate={a.centroid}
              key={a.id}
              title={a.name}
              onPress={this._onMarkerPress(a)}
            />
          ))}
          {coordinates.length > 0 && <Polygon coordinates={coordinates} />}
          {tag != null && (
            <Marker
              coordinate={tag.position}
              key={tag.id}
              title={tag.name}
              pinColor={colors.logoBlue}
            />
          )}
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
  style: View.propTypes.style,
  tag: ?Tag
}

type MapComponentState = {
  area: ?Area,
  region: Region
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
