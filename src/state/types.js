import type { NavigationAction, NavigationState } from "react-navigation"
import type { Area } from "./area"

export type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

export type State = {
  +map: {
    lastRegion: Region,
    mode: string
  },
  +nav: NavigationState,
  +area: {
    areas: Area[]
  }
}

export type Action = NavigationAction
