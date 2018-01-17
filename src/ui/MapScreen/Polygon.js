// @flow
import React from "react"
import MapView from "react-native-maps"
import { colors } from "../../styles"
import type { Coordinate } from "../../data/types"

const fillColor = colors.statusGreenAlpha50
const strokeColor = colors.logoBlue
const strokeWidth = 3

const Polygon = (props: Props) => {
  return (
    <MapView.Polygon
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

export default Polygon
