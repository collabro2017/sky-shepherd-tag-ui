// @flow
import React from "react"
import { View } from "react-native"
import Polygon from "./Polygon"
import AreaCoordinateMarker from "./AreaCoordinateMarker"
import type { AreaChanges, Coordinate, PressEvent } from "../../../types"

const coordinateKey = ({ latitude, longitude }: Coordinate): string =>
  "(" + latitude.toString() + "," + longitude.toString() + ")"

const coordinatesKey = (coordinates: Coordinate[]): string =>
  "[" + coordinates.map(coordinateKey).join(",") + "]"

export default function AreaChangesMapContent({
  areaChanges,
  modifyAreaCoordinate
}: Props) {
  // Google Maps crashes if a polygon has no coordinates
  if (areaChanges != null && areaChanges.coordinates.length > 0) {
    const { coordinates } = areaChanges
    return (
      <View>
        <Polygon
          coordinates={coordinates}
          identifier={coordinatesKey(coordinates)}
        />
        {coordinates.map((coordinate, index) => (
          <AreaCoordinateMarker
            coordinate={coordinate}
            key={coordinateKey(coordinate)}
            onDragEnd={modifyAreaCoordinate(index)}
          />
        ))}
      </View>
    )
  } else {
    return <View />
  }
}

type Props = {
  areaChanges: ?AreaChanges,
  modifyAreaCoordinate: number => PressEvent => void
}
