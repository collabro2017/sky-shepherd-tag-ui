// @flow
import Promise from "promise"
import type { NavigationAction, NavigationState } from "react-navigation"
import type { ActiveBoundary, Area, Coordinate, Tag } from "../data"

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
  lastRegion: Region,
  mode: MapMode,
  region: ?Region
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

export type ActiveBoundaryAction =
  | { type: "tag/activeBoundary/CREATED", payload: ActiveBoundary }
  | { type: "tag/activeBoundary/UPDATED", payload: ActiveBoundary }
  | { type: "tag/activeBoundary/SUBSCRIBED" }

export type AreaAction =
  | { type: "tag/area/LOADED", payload: Area[] }
  | { type: "tag/area/SELECTED", payload: string }

export type MapAction =
  | { type: "tag/map/SHOW_AREA", payload: Area }
  | { type: "tag/map/MOVE_TO_LOCATION", payload: { location: Coordinate } }
  | { type: "tag/map/REGION_CHANGED", payload: { region: Region } }
  | { type: "tag/map/CREATE_BOUNDARY", payload: {} }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?{ area: ?Area } }

export type Action =
  | ActiveBoundaryAction
  | AreaAction
  | MapAction
  | NavigationAction

export type MapMode = "view" | "create" | "area"

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export type GetState = () => Object
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>
