// @flow
import React from "react"
import CreateMapContent from "./CreateMapContent"
import ViewMapContent from "./ViewMapContent"
import type { Area, Tag } from "../../../data/types"
import type { MapMode } from "../../../state/types"

export default function MapContent(props: Props) {
  const { area, areas, mode, onAreaMarkerPress, tag } = props
  switch (mode) {
    case "create" || "edit":
      return <CreateMapContent />
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
  onAreaMarkerPress: Area => () => void,
  tag: ?Tag
}
