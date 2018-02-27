// @flow
import React from "react"
import AreaChangesMapContent from "./AreaChangesMapContent"
import ViewMapContent from "./ViewMapContent"
import type { Area, AreaChanges, Tag } from "../../../data/types"
import type { MapMode } from "../../../state/types"

export default function MapContent(props: Props) {
  const { area, areas, mode, areaChanges, onAreaMarkerPress, tag } = props
  switch (mode) {
    case "create" || "edit":
      return <AreaChangesMapContent areaChanges={areaChanges} />
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
  areaChanges: ?AreaChanges,
  onAreaMarkerPress: Area => () => void,
  tag: ?Tag
}
