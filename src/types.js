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
  area: ?Area,
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
  areaChanges: ?AreaChanges,
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

export type AreaAction = { type: "AREA_SELECTED", payload: string }

export type DataAction =
  | { type: "AREAS_FETCH_SUCCESS", payload: Area[] }
  | { type: "TAGS_FETCH_SUCCESS", payload: Tag[] }

export type MapRouteParams = { area: ?Area, tag: ?Tag, mode: MapMode }
export type MapAction =
  | { type: "MAP_REGION_CHANGED", payload: { region: Region } }
  | { type: "AREA_CREATE", payload: {} }
  | { type: "AREA_CHANGES_SAVE", payload: AreaChanges }
  | { type: "AREA_CHANGES_CANCEL" }
  | { type: "AREA_CHANGES_ADD_COORDINATE", payload: Coordinate }
  | { type: "AREA_CHANGES_UPDATE_NAME", payload: string }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?MapRouteParams }

export type TagAction =
  | { type: "TAG_CREATED", payload: Tag }
  | { type: "TAG_SUBSCRIBED" }
  | { type: "TAG_UPDATED", payload: Tag }
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
  | "edit:save"
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
  saveArea(id: ?string, name: string, coordinates: Coordinate[]): ThunkAction;
}
