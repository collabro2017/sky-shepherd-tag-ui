// @flow
import React from "react"
import { View } from "react-native"
import Polygon from "./Polygon"
import AreaCoordinateMarker from "./AreaCoordinateMarker"
import type { AreaChanges } from "../../../types"

const coordinateKey = ({ latitude, longitude }: Coordinate): string =>
  "(" + latitude.toString() + "," + longitude.toString() + ")"

const coordinatesKey = (coordinates: Coordinate[]): string =>
  "[" + coordinates.map(coordinateKey).join(",") + "]"

export default function AreaChangesMapContent({ areaChanges }: Props) {
  // Google Maps crashes if a polygon has no coordinates
  if (areaChanges != null && areaChanges.coordinates.length > 0) {
    const { coordinates } = areaChanges
    return (
      <View>
        <Polygon
          coordinates={coordinates}
          identifier={coordinatesKey(coordinates)}
        />
        {coordinates.map(coordinate => (
          <AreaCoordinateMarker
            coordinate={coordinate}
            key={coordinateKey(coordinate)}
          />
        ))}
      </View>
    )
  } else {
    return <View />
  }
}

type Props = {
  areaChanges: ?AreaChanges
}
