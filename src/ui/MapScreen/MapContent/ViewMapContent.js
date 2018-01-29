// @flow
import React from "react"
import { View } from "react-native"
import AreaMarker from "./AreaMarker"
import Polygon from "./Polygon"
import TagMarker from "./TagMarker"
import { coordinatesFromArea } from "../areaConversion"
import type { Area, Coordinate, Tag } from "../../../data/types"

export default function ViewMapContent(props: Props) {
  const { area, areas, tag, onAreaMarkerPress } = props
  const coordinates: Coordinate[] = coordinatesFromArea(area)
  return (
    <View>
      {areas.map(area => (
        <AreaMarker
          area={area}
          key={area.id}
          onMarkerPress={onAreaMarkerPress(area)}
        />
      ))}
      {coordinates.length > 0 && <Polygon coordinates={coordinates} />}
      {tag != null && <TagMarker tag={tag} key={tag.id} />}
    </View>
  )
}

type Props = {
  area: ?Area,
  areas: Area[],
  onAreaMarkerPress: Area => () => void,
  tag: ?Tag
}
