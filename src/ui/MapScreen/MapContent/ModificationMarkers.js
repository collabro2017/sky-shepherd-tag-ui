// @flow
import React from "react"
import { Image, View } from "react-native"
import { Marker } from "react-native-maps"
import Icon from "react-native-vector-icons/Feather"
import markerImage from "./ic_bound_point_30dp.png"
import styles, { colors } from "../../../styles"
import type { Coordinate } from "../../../data/types"

export default function ModificationMarkers({ coordinates }: Props) {
  console.log({ render: "ModificationMarkers", count: coordinates.length })
  return (
    <View>
      {coordinates.map((coordinate, index) => {
        console.log({ marker: index })
        return (
          <Marker
            coordinate={coordinate}
            key={`area-marker-${index}`}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.mapModificationMarker} />
          </Marker>
        )
      })}
    </View>
  )
}

type Props = {
  coordinates: Coordinate[]
}
