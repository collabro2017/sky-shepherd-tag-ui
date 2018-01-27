// @flow
import React from "react"
import { Marker } from "react-native-maps"
import type { Area } from "../../../data/types"

export default function AreaMarker({ area, onMarkerPress }: Props) {
  return (
    <Marker
      coordinate={area.centroid}
      title={area.name}
      onPress={onMarkerPress}
    />
  )
}

type Props = {
  area: Area,
  onMarkerPress: () => void
}
