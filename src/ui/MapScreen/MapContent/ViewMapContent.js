// @flow
import React from "react"
import { View } from "react-native"
import AreaMarkers from "./AreaMarkers"
import Polygon from "./Polygon"
import TagMarkers from "./TagMarkers"
import { coordinatesFromArea } from "../area"
import type { Area, Coordinate, Tag } from "../../../data/types"

export default function ViewMapContent(props: Props) {
  const { area, areas, tag, onAreaMarkerPress } = props
  const coordinates: Coordinate[] = coordinatesFromArea(area)
  return (
    <View>
      <AreaMarkers areas={areas} onMarkerPress={onAreaMarkerPress} />
      {coordinates.length > 0 && <Polygon coordinates={coordinates} />}
      {tag != null && <TagMarkers tags={[tag]} />}
    </View>
  )
}

type Props = {
  area: ?Area,
  areas: Area[],
  onAreaMarkerPress: Area => () => void,
  tag: ?Tag
}
