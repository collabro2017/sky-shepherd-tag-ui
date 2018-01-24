// @flow
import React from "react"
import { Marker } from "react-native-maps"
import type { Area } from "../../data/types"

export default ({ areas, onMarkerPress }: Props) => {
  return areas.map((area: Area) => (
    <Marker
      coordinate={area.centroid}
      key={area.id}
      title={area.name}
      onPress={onMarkerPress(area)}
    />
  ))
}

type Props = {
  areas: Area[],
  onMarkerPress: Area => () => void
}
