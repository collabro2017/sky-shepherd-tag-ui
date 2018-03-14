// @flow
import React from "react"
import { View } from "react-native"
import { Marker } from "react-native-maps"
import styles from "../../../styles"
import type { Coordinate } from "../../../state/types"

export default function ModificationMarker(props: Props) {
  return (
    <Marker anchor={{ x: 0.5, y: 0.5 }} {...props}>
      <View style={styles.mapModificationMarker} />
    </Marker>
  )
}

type Props = {
  coordinate: Coordinate
}
