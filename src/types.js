// @flow
import Promise from "promise"
import type { NavigationAction, NavigationState } from "react-navigation"

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

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

export type NewArea = {
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

export type DataState = {
  areas: { [key: string]: Area },
  tags: { [key: string]: Tag }
}

export type AreaState = {
  areas: Area[]
}

export type MapState = {
  area: ?Area,
  lastMode: MapMode,
  lastRegion: Region,
  mode: MapMode,
  newArea: ?NewArea,
  tag: ?Tag
}

export type TagState = {
  tags: Tag[]
}

export type State = {
  +area: AreaState,
  +data: DataState,
  +map: MapState,
  +nav: NavigationState,
  +tag: TagState
}

export type AreaAction =
  | { type: "tag/area/LOADED", payload: Area[] }
  | { type: "tag/area/SELECTED", payload: string }

export type DataAction =
  | { type: "tag/data/AREAS_LOADED", payload: Area[] }
  | { type: "tag/data/TAGS_LOADED", payload: Tag[] }

export type MapRouteParams = { area: ?Area, tag: ?Tag, mode: MapMode }
export type MapAction =
  | { type: "tag/map/REGION_CHANGED", payload: { region: Region } }
  | { type: "tag/map/CREATE_BOUNDARY", payload: {} }
  | { type: "tag/map/SAVE_NEW_AREA", payload: NewArea }
  | { type: "tag/map/CANCEL_NEW_AREA" }
  | { type: "tag/map/ADD_COORDINATE_TO_NEW_AREA", payload: Coordinate }
  | { type: "tag/map/UPDATE_NEW_AREA_NAME", payload: string }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?MapRouteParams }

export type TagAction =
  | { type: "tag/tag/CREATED", payload: Tag }
  | { type: "tag/tag/LOADED", payload: Tag[] }
  | { type: "tag/tag/SELECTED", payload: string }
  | { type: "tag/tag/SUBSCRIBED" }
  | { type: "tag/tag/UPDATED", payload: Tag }
  | DataAction

export type Action =
  | AreaAction
  | DataAction
  | MapAction
  | NavigationAction
  | TagAction

export type MapMode =
  | "view"
  | "create"
  | "create:save"
  | "edit"
  | "area"
  | "tag"
export type MapType = "hybrid"

export type NativePressEvent = { coordinate: Coordinate, point: Point }
export type PressEvent = { nativeEvent: NativePressEvent }

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export type GetState = () => State
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>

export interface Cloud {
  authenticate(): ThunkAction;
  getAreas(): ThunkAction;
  getActiveBoundaries(): ThunkAction;
  tagStubs(): Tag[];
}
