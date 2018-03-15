// @flow
import React from "react"
import { View } from "react-native"
import Polygon from "./Polygon"
import AreaCoordinateMarker from "./AreaCoordinateMarker"
import type { AreaChanges } from "../../../types"

export default function AreaChangesMapContent({ areaChanges }: Props) {
  // Google Maps crashes if a polygon has no coordinates
  if (areaChanges != null && areaChanges.coordinates.length > 0) {
    return (
      <View>
        <Polygon coordinates={areaChanges.coordinates} />
        {areaChanges.coordinates.map((coordinate, index) => (
          <AreaCoordinateMarker coordinate={coordinate} key={index} />
        ))}
      </View>
    )
  } else {
    return <View />
  }
}

type Props = {
  areaChanges: ?AreaChanges
}
