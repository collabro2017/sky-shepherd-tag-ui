// @flow
import React from "react"
import { View } from "react-native"
import Polygon from "./Polygon"
import ModificationMarker from "./ModificationMarker"
import type { NewArea } from "../../../data/types"

export default function CreateMapContent({ newArea }: Props) {
  if (newArea != null) {
    return (
      <View>
        {newArea.coordinates.length > 0 && (
          // Google Maps crashes if a polygon has no coordinates
          <Polygon coordinates={newArea.coordinates} />
        )}
        {newArea.coordinates.map((coordinate, index) => (
          <ModificationMarker coordinate={coordinate} key={index} />
        ))}
      </View>
    )
  } else {
    return <View />
  }
}

type Props = {
  newArea: ?NewArea
}
