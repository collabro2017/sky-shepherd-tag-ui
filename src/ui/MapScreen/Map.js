// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { Alert, View } from "react-native"
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import Polygon from "./Polygon"
import type { Region, State } from "../../state/types"
import type { Area, Coordinate, Point } from "../../data/types"
import styles from "../../styles"

import { mapSelectors, mapOperations } from "../../state/map"

type IndexesAndScale = {
  index: number,
  reference: number,
  scale: number
}

type PointsAndScale = {
  point: Point,
  zeroPoint: Point,
  scale: number
}

// Convert index to lat/long int
const indexToPosition = ({
  index,
  reference,
  scale
}: IndexesAndScale): number => {
  return ((index * scale) >> 4) + reference
}

// Convert indexed point to mappable coordinate
const coordinateFromPoint = ({
  point,
  zeroPoint,
  scale
}: PointsAndScale): Coordinate => {
  const x = indexToPosition({
    index: point.x,
    reference: zeroPoint.x,
    scale: scale
  })
  const y = indexToPosition({
    index: point.y,
    reference: zeroPoint.y,
    scale: scale
  })
  const maxMinPosRatio = 100000.0

  return {
    latitude: y / maxMinPosRatio,
    longitude: x / maxMinPosRatio
  }
}

const coordinatesFromArea = (area: ?Area): Coordinate[] => {
  if (typeof area === "undefined" || area === null) {
    return []
  }

  const { minPos, scale, points } = area
  return points.pointsArray.map((point: Point): Coordinate => {
    return coordinateFromPoint({ point, scale, zeroPoint: minPos })
  })
}

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
    const region: Region = this.props.region || this.props.lastRegion
    const props: Props = { ...this.props, region }
    const { area } = props
    const coordinates = coordinatesFromArea(area)
    return (
      <View style={{ flex: 1 }}>
        <MapView {...props}>
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
