// @flow
import React from "react"
import AreaChangesMapContent from "./AreaChangesMapContent"
import ViewMapContent from "./ViewMapContent"
import type { Area, AreaChanges, MapMode, Tag } from "../../../types"

export default function MapContent(props: Props) {
  const {
    area,
    areas,
    mode,
    areaChanges,
    onAreaMarkerPress,
    onTagMarkerPress,
    tag
  } = props
  switch (mode) {
    case "create":
    case "edit":
      return <AreaChangesMapContent areaChanges={areaChanges} />
    default:
      return (
        <ViewMapContent
          area={area}
          areas={areas}
          tag={tag}
          onAreaMarkerPress={onAreaMarkerPress}
          onTagMarkerPress={onTagMarkerPress}
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
  onTagMarkerPress: Tag => () => void,
  tag: ?Tag
}
