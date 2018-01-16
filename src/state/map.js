// @flow
import { calculateLongitudeDelta } from "../utils/map"
import type { MapAction, MapState, Region, State } from "./types"
import type { Area, Coordinate } from "../data/types"

// ACTIONS
const moveToLocationAction = (location: Coordinate): MapAction => {
  return { type: "tag/map/MOVE_TO_LOCATION", payload: { location } }
}

const regionChangedAction = (region: Region): MapAction => {
  return { type: "tag/map/REGION_CHANGED", payload: { region } }
}

const createBoundaryAction = (): MapAction => {
  return { type: "tag/map/CREATE_BOUNDARY", payload: {} }
}

// OPERATIONS
const moveToLocation = moveToLocationAction
const regionChanged = regionChangedAction
const createBoundary = createBoundaryAction

const operations = { moveToLocation, regionChanged, createBoundary }

// SELECTORS
const selectors = {
  getRegion: (state: State): ?Region => state.map.region,
  getLastRegion: (state: State): Region => state.map.lastRegion,
  getMode: (state: State): string => state.map.mode
}

// REDUCERS
const updateRegion = (region: Region, newLocation: Coordinate) => {
  return {
    ...region,
    latitude: newLocation.latitude,
    longitude: newLocation.longitude
  }
}

const regionFromArea = (area: Area): Region => {
  console.log({ area })
  return {
    // TODO: Calculate proper deltas
    ...defaultRegion,
    ...area.centroid
  }
}

const defaultLatitudeDelta = 0.00922
const defaultRegion: Region = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

const initialMapState: MapState = {
  lastRegion: defaultRegion,
  mode: "view",
  region: null
}

const reducer = (
  state: MapState = initialMapState,
  action: MapAction
): MapState => {
  switch (action.type) {
    case "tag/map/MOVE_TO_LOCATION":
      return {
        ...state,
        region: updateRegion(
          state.region || defaultRegion,
          action.payload.location
        )
      }
    case "tag/map/REGION_CHANGED":
      return {
        ...state,
        lastRegion: action.payload.region
      }
    case "tag/map/CREATE_BOUNDARY":
      return {
        ...state,
        mode: "create"
      }
    case "tag/map/SHOW_AREA":
      return {
        ...state,
        region: regionFromArea(action.payload)
      }
    default:
      return state
  }
}

// INTERFACE
export { selectors as mapSelectors }
export { operations as mapOperations }
export { initialMapState }
export default reducer
