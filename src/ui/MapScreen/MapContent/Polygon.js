// @flow
import React from "react"
import { Polygon as MapViewPolygon } from "react-native-maps"
import { colors } from "../../../styles"
import type { Coordinate } from "../../../state/types"

const fillColor = colors.statusGreenAlpha50
const strokeColor = colors.logoBlue
const strokeWidth = 3

export default function Polygon(props: Props) {
  return (
    <MapViewPolygon
      coordinates={props.coordinates}
      fillColor={fillColor}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
    />
  )
}

type Props = {
  coordinates: Coordinate[]
}
