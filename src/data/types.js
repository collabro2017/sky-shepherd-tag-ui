// @flow
export type ActiveBoundary = {
  boundaryId: string,
  coreId: number,
  id: string,
  position: Coordinate,
  region: number,
  createdAt: Date,
  updatedAt: Date
}

export type Area = {
  centroid: Coordinate,
  id: string,
  identifier: number,
  maxIdx: Point,
  maxPos: Point,
  minPos: Point,
  name: string,
  points: {
    pointsArray: Point[]
  },
  ptCnt: number,
  scale: number,
  createdAt: Date,
  updatedAt: Date
}

export type Point = {
  x: number,
  y: number
}

export type Coordinate = {
  latitude: number,
  longitude: number
}
export type Tag = {
  objectId: string,
  name: string
}
