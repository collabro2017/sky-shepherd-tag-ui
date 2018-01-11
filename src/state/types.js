// @flow
import type { NavigationAction, NavigationState } from "react-navigation"
import type { Area, Tag } from "../data"

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

export type AreaState = {
  areas: Area[]
}

export type TagState = {
  tags: Tag[]
}

export type State = {
  +map: {
    lastRegion: Region,
    mode: string
  },
  +nav: NavigationState,
  +area: {
    areas: Area[]
  },
  +tag: TagState
}

export type Action = NavigationAction
