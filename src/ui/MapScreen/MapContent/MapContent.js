// @flow
import React from "react"
import CreateMapContent from "./CreateMapContent"
import ViewMapContent from "./ViewMapContent"
import type { Area, MapMode, NewArea, Tag } from "../../../types"

export default function MapContent(props: Props) {
  const { area, areas, mode, newArea, onAreaMarkerPress, tag } = props
  switch (mode) {
    case "create" || "edit":
      return <CreateMapContent newArea={newArea} />
    default:
      return (
        <ViewMapContent
          area={area}
          areas={areas}
          tag={tag}
          onAreaMarkerPress={onAreaMarkerPress}
        />
      )
  }
}

type Props = {
  area: ?Area,
  areas: Area[],
  mode: MapMode,
  newArea: ?NewArea,
  onAreaMarkerPress: Area => () => void,
  tag: ?Tag
}
