// @flow
import React from "react"
import { View } from "react-native"
import ModificationMarkers from "./ModificationMarkers"
import type { NewArea } from "../../../data/types"

export default function CreateMapContent({ newArea }: Props) {
  console.log("render createMapContent")
  return (
    <View>
      {newArea != null && (
        <ModificationMarkers coordinates={newArea.coordinates} />
      )}
    </View>
  )
}

type Props = {
  newArea: ?NewArea
}
