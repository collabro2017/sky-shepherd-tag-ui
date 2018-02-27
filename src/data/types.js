// @flow
export type Tag = {
  boundaryId: string,
  coreId: number,
  id: string,
  name: string,
  position: Coordinate,
  region: number,
  createdAt: Date,
  updatedAt: Date
}

// Unsaved Area data
export type AreaData = {
  centroid: Coordinate,
  identifier: number,
  maxIdx: Point,
  maxPos: Point,
  minPos: Point,
  name: string,
  points: {
    pointsArray: Point[]
  },
  ptCnt: number,
  scale: number
}

export type Area = {
  centroid: Coordinate,
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
  id: string,
  createdAt: Date,
  updatedAt: Date
}

export type AreaChanges = {
  coordinates: Coordinate[],
  name: string
}

export type Point = {
  x: number,
  y: number
}

export type Coordinate = {
  latitude: number,
  longitude: number
}
