// @flow
import React from "react"
import { Marker } from "react-native-maps"
import { colors } from "../../../styles"
import type { Tag } from "../../../data/types"

export default function TagMarker({ tag }: Props) {
  return (
    <Marker
      coordinate={tag.position}
      title={tag.name}
      pinColor={colors.logoBlue}
    />
  )
}

type Props = {
  tag: Tag
}
