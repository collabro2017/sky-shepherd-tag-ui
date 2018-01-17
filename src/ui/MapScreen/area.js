// @flow
import type { Area, Coordinate, Point } from "../../data/types"
import type { Region } from "../../state/types"

type IndexesAndScale = {
  index: number,
  reference: number,
  scale: number
}

type PointsAndScale = {
  point: Point,
  zeroPoint: Point,
  scale: number
}

const maxMinPosRatio = 100000.0

// Convert index to lat/long int
const indexToPosition = (params: IndexesAndScale): number => {
  const { index, reference, scale } = params
  return ((index * scale) >> 4) + reference
}

// Convert indexed point to mappable coordinate
const coordinateFromPoint = (params: PointsAndScale): Coordinate => {
  const { point, zeroPoint, scale } = params
  const x = indexToPosition({
    index: point.x,
    reference: zeroPoint.x,
    scale: scale
  })
  const y = indexToPosition({
    index: point.y,
    reference: zeroPoint.y,
    scale: scale
  })

  return {
    latitude: y / maxMinPosRatio,
    longitude: x / maxMinPosRatio
  }
}

const coordinatesFromArea = (area: ?Area): Coordinate[] => {
  if (typeof area === "undefined" || area === null) {
    return []
  }

  const { minPos, scale, points } = area
  return points.pointsArray.map((point: Point): Coordinate => {
    return coordinateFromPoint({ point, scale, zeroPoint: minPos })
  })
}

type MinMax = {
  min: number,
  max: number
}

const calculateDelta = (extent: MinMax): number => {
  const paddingFactor = 1.1
  const delta = Math.abs(extent.max - extent.min) / maxMinPosRatio
  return delta * paddingFactor
}
const latitudeDelta = (area: Area): number => {
  return calculateDelta({ max: area.maxPos.y, min: area.minPos.y })
}

const longitudeDelta = (area: Area): number => {
  return calculateDelta({ max: area.maxPos.x, min: area.minPos.x })
}

const regionFromArea = (area: Area): Region => {
  return {
    latitude: area.centroid.latitude,
    longitude: area.centroid.longitude,
    latitudeDelta: latitudeDelta(area),
    longitudeDelta: longitudeDelta(area)
  }
}

export { coordinatesFromArea, regionFromArea }
