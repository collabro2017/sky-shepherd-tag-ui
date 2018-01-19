// @flow
import { calculateLongitudeDelta } from "../utils/map"
import type { MapAction, MapState, Region, State } from "./types"
import type { Area, Coordinate } from "../data/types"

// ACTIONS
const regionChangedAction = (region: Region): MapAction => {
  return { type: "tag/map/REGION_CHANGED", payload: { region } }
}

const createBoundaryAction = (): MapAction => {
  return { type: "tag/map/CREATE_BOUNDARY", payload: {} }
}

// OPERATIONS
const regionChanged = regionChangedAction
const createBoundary = createBoundaryAction

const operations = { regionChanged, createBoundary }

// SELECTORS
const selectors = {
  getArea: (state: State): ?Area => state.map.area,
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

const defaultLatitudeDelta = 0.00922
const defaultRegion: Region = {
  latitude: 44.906005,
  longitude: -93.198442,
  latitudeDelta: defaultLatitudeDelta,
  longitudeDelta: calculateLongitudeDelta(defaultLatitudeDelta)
}

const initialMapState: MapState = {
  area: null,
  lastRegion: defaultRegion,
  mode: "view",
  region: null
}

const reducer = (
  state: MapState = initialMapState,
  action: MapAction
): MapState => {
  switch (action.type) {
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
    case "Navigation/NAVIGATE":
      switch (action.routeName) {
        case "map":
          if (
            typeof action.params !== "undefined" &&
            action.params !== null &&
            typeof action.params.area !== "undefined" &&
            action.params.area !== null
          ) {
            // Area was just selected
            const area = action.params.area
            return {
              ...state,
              area,
              mode: "area"
            }
          } else {
            // No area, just viewing the map
            return {
              ...state,
              mode: "view"
            }
          }
        default:
          return state
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
