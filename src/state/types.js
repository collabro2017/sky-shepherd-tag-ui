// @flow
import Promise from "promise"
import type { NavigationAction, NavigationState } from "react-navigation"
import type { Area, Tag } from "../data/types"

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

export type MapRouteParams = { area: ?Area, tag: ?Tag }
export type MapAction =
  | { type: "tag/map/REGION_CHANGED", payload: { region: Region } }
  | { type: "tag/map/CREATE_BOUNDARY", payload: {} }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?MapRouteParams }
  | { type: "Navigation/NAVIGATE", routeName: "map", params: ?MapRouteParams }

export type TagAction =
  | { type: "tag/tag/CREATED", payload: Tag }
  | { type: "tag/tag/LOADED", payload: Tag[] }
  | { type: "tag/tag/SELECTED", payload: string }
  | { type: "tag/tag/SUBSCRIBED" }
  | { type: "tag/tag/UPDATED", payload: Tag }

export type Action = AreaAction | MapAction | NavigationAction | TagAction

export type MapMode = "view" | "create" | "edit" | "area" | "tag"

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export type GetState = () => Object
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type PromiseAction = Promise<Action>
