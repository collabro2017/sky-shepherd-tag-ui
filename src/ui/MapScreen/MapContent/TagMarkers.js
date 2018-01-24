// @flow
import React from "react"
import { Marker } from "react-native-maps"
import { colors } from "../../../styles"
import type { Tag } from "../../../data/types"

export default function TagMarkers({ tags }: Props) {
  return tags.map((tag: Tag) => (
    <Marker
      coordinate={tag.position}
      key={tag.id}
      title={tag.name}
      pinColor={colors.logoBlue}
    />
  ))
}

type Props = {
  tags: Tag[]
}
