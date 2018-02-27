// @flow
import Promise from "promise"
import type { NavigationAction, NavigationState } from "react-navigation"
import type { Area, Coordinate, AreaChanges, Point, Tag } from "../data/types"

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
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
  +map: MapState,
  +nav: NavigationState,
  +tag: TagState
}

export type AreaAction =
  | { type: "tag/area/LOADED", payload: Area[] }
  | { type: "tag/area/SELECTED", payload: string }

export type MapRouteParams = { area: ?Area, tag: ?Tag, mode: MapMode }
export type MapAction =
  | { type: "tag/map/REGION_CHANGED", payload: { region: Region } }
  | { type: "tag/map/CREATE_AREA", payload: {} }
  | { type: "tag/map/SAVE_AREA_CHANGES", payload: AreaChanges }
  | { type: "tag/map/CANCEL_AREA_CHANGES" }
  | { type: "tag/map/ADD_COORDINATE_TO_AREA", payload: Coordinate }
  | { type: "tag/map/UPDATE_AREA_NAME", payload: string }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?MapRouteParams }

export type TagAction =
  | { type: "tag/tag/CREATED", payload: Tag }
  | { type: "tag/tag/LOADED", payload: Tag[] }
  | { type: "tag/tag/SELECTED", payload: string }
  | { type: "tag/tag/SUBSCRIBED" }
  | { type: "tag/tag/UPDATED", payload: Tag }

export type Action = AreaAction | MapAction | NavigationAction | TagAction

export type MapMode = "view" | "create" | "edit" | "area" | "tag"
export type MapType = "hybrid"

export type NativePressEvent = { coordinate: Coordinate, point: Point }
export type PressEvent = { nativeEvent: NativePressEvent }

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export type GetState = () => State
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>
