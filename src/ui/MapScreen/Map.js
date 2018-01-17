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

const maxMinPosRatio = 100000.0

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

type MinMax = {
  min: number,
  max: number
}

const calculateDelta = (extent: MinMax): number => {
  const paddingFactor = 1.1
  const delta = Math.abs(extent.max - extent.min) / maxMinPosRatio
  return delta * paddingFactor
}
const latitudeDelta = (area: Area): number => {
  return calculateDelta({ max: area.maxPos.y, min: area.minPos.y })
}

const longitudeDelta = (area: Area): number => {
  return calculateDelta({ max: area.maxPos.x, min: area.minPos.x })
}

const regionFromArea = (area: Area): Region => {
  return {
    latitude: area.centroid.latitude,
    longitude: area.centroid.longitude,
    latitudeDelta: latitudeDelta(area),
    longitudeDelta: longitudeDelta(area)
  }
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
