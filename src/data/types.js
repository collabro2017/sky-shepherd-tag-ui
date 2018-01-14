// @flow
export type ActiveBoundary = {
  objectId: string,
  createdAt: Date,
  updatedAt: Date,
  position: Coordinate,
  region: number,
  coreId: number,
  boundaryId: string
}

export type Area = {
  objectId: string,
  name: string
}

export type Coordinate = {
  latitude: number,
  longitude: number
}
export type Tag = {
  objectId: string,
  name: string
}
