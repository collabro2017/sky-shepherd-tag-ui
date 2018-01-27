// @flow
import React from "react"
import { View } from "react-native"
import Polygon from "./Polygon"
import ModificationMarkers from "./ModificationMarkers"
import type { NewArea } from "../../../data/types"

export default function CreateMapContent({ newArea }: Props) {
  console.log("render createMapContent")
  if (newArea != null) {
    return (
      <View>
        <Polygon coordinates={newArea.coordinates} />
        <ModificationMarkers coordinates={newArea.coordinates} />
      </View>
    )
  } else {
    return <View />
  }
}

type Props = {
  newArea: ?NewArea
}
