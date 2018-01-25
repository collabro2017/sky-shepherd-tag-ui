// @flow
import React, { Component } from "react"
import { InteractionManager, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { isEqual } from "lodash"
import MapContent from "./MapContent"
import { regionFromArea } from "./area"
import { defaultLatitudeDelta } from "../../state/map"
import { calculateLongitudeDelta } from "../../utils/map"
import styles from "../../styles"

import type { MapMode, MapType, PressEvent, Region } from "../../state/types"
import type { Area, NewArea, Tag } from "../../data/types"

type MapViewType = {
  animateToRegion: (region: Region) => void
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
const onAreaMarkerPress = (
  map: Map,
  navigateToArea: Area => void
): AreaHandler => {
  return (area: Area) => {
    return () => {
      map.setState({ area })
      navigateToArea(area)
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

const provider: string = PROVIDER_GOOGLE

class Map extends Component<Props, MapComponentState> {
  _map: ?MapViewType
  _onRegionChangeComplete: RegionHandler
  _onAreaMarkerPress: AreaHandler

  constructor(props: Props) {
    super(props)
    const region = pickRegion(props)
    const { area } = props
    this.state = { area, region }
    this._onAreaMarkerPress = onAreaMarkerPress(this, props.navigateToArea)
    this._onRegionChangeComplete = onRegionChangeComplete(this)
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
    console.log("render map")
    return (
      <View style={{ flex: 1 }}>
        <MapView
          initialRegion={this.state.region}
          mapType={this.props.mapType}
          onLongPress={this.props.onLongPress}
          onPress={this.props.onPress}
          onRegionChangeComplete={this._onRegionChangeComplete}
          provider={provider}
          ref={(ref: ?MapViewType) => (this._map = ref)}
          region={this.state.region}
          style={styles.map}
        >
          <MapContent
            area={this.state.area}
            areas={this.props.areas}
            mode={this.props.mode}
            newArea={this.props.newArea}
            tag={this.props.tag}
            onAreaMarkerPress={this._onAreaMarkerPress}
          />
        </MapView>
      </View>
    )
  }
}

type Props = {
  area: ?Area,
  areas: Area[],
  lastRegion: Region,
  mapType: MapType,
  mode: MapMode,
  navigateToArea: Area => void,
  newArea: ?NewArea,
  onLongPress: () => void,
  onPress: PressEvent => void,
  saveRegion: RegionHandler,
  tag: ?Tag
}

type MapComponentState = {
  area: ?Area,
  region: Region
}

export default Map
