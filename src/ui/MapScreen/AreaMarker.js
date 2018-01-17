// @flow
import React from "react"
import { View } from "react-native"
import MapView from "react-native-maps"
import type { Area } from "../../data/types"

const AreaMarker = ({ area }: Props) => {
  if (area) {
    return <MapView.Marker coordinate={area.centroid} title={area.name} />
  } else {
    // Nothing
    return <View />
  }
}

type Props = {
  area: ?Area
}
export default AreaMarker
