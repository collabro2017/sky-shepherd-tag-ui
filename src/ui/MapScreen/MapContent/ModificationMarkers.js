// @flow
import React from "react"
import { Marker } from "react-native-maps"
import type { Coordinate } from "../../../data/types"

export default function ModificationMarkers({ coordinates }: Props) {
  console.log("render ModificationMarkers count=" + coordinates.length)
  return coordinates.map((coordinate, index) => (
    <Marker coordinate={coordinate} key={index} />
  ))
}

type Props = {
  coordinates: Coordinate[]
}
