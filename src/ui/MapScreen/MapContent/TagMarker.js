// @flow
import React from "react"
import { Marker } from "react-native-maps"
import { tagStatusColor } from "../../tagDisplay"
import type { Tag } from "../../../types"

export default function TagMarker({ tag, onPress }: Props) {
  return (
    <Marker
      coordinate={tag.position}
      title={tag.name}
      pinColor={tagStatusColor(tag)}
      onPress={onPress}
    />
  )
}

type Props = {
  tag: Tag,
  onPress: () => void
}
